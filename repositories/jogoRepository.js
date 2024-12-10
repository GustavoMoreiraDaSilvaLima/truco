import jogoEntity from '../entities/salaEntity.js';
import BaseRepository from './baseRepository.js';
import salaRepository from './salaRepository.js';

export default class jogoRepository extends BaseRepository {

    constructor(db) {
        super(db);
    }

    async listar() {
        let sql = "select * from tb_jogo as jog inner join tb_sala as sala on jog.sal_id = sala.sal_id";
        let rows = await this.db.ExecutaComando(sql);
        return this.toMap(rows);
    }

    async obter(id) {
        let sql = "select * from tb_jogo where jog_id = ?";
        let valores = [id];
        let row = await this.db.ExecutaComando(sql, valores);
        return this.toMap(row[0]);
    }

    async gravar(entidade) {
        let sql = "insert into tb_jogo (jog_dtinicio, jog_dtfim, sal_id) values (?, ?, ?)";
        let valores = [entidade.jogDtinicio, entidade.jogDtfim, entidade.sala.salId];
        let result = await this.db.ExecutaComandoNonQuery(sql, valores);
        return result;
    }

    async alterar(entidade) {
        let sql = "update tb_jogo set jog_dtinicio = ?, jog_dtfim = ?, sal_id = ? where jog_id = ?;";
        let valores = [entidade.jogDtinicio, entidade.jogDtfim, entidade.sala.salId, entidade.jogId];
        let result = await this.db.ExecutaComandoNonQuery(sql, valores);
        return result;
    }

    async alterarParcialmente(entidade) {
        let sql = `update tb_jogo set jog_dtinicio = coalesce(?, jog_dtinicio),
                                         jog_dtfim = coalesce(?, jog_dtfim),
                                         sal_id = coalesce(?, sal_id)
                    where jog_id = ?`;
        let valores = [entidade.salNome, entidade.usuario.id]
        let result = await this.db.ExecutaComandoNonQuery(sql, valores);
        return result;
    }

    async delete(id) {
        let sql = "delete from tb_jogo where jog_id = ?";

        let valores = [id];

        let result = await this.db.ExecutaComandoNonQuery(sql, valores);

        return result;
    }

    async JogoIniciar(Sala){
        const sql = `insert into tb_jogo (jog_dtinicio, sal_id) values (NOW(), ?);`;
        const valores = [Sala];
        const result = await this.db.ExecutaComandoLastInserted(sql, valores);
        return result;
    }

    async obterUmaMao(Jogo){
        const sql = `select * from tb mao where jog_id = ? order by mao_id desc limit 1`;
        const valores = [Jogo];
        const row = await this.db.ExecutaComando(sql, valores);
        return this.toMap(row[0]);
    }

    async JogoFinalizar(Sala){
        const sql = `update tb_jogo set jog_dtfim = NOW() where sal_id = ? and jog_dtfim is null;`;
        const valores = [Sala];
        const result = await this.db.ExecutaComandoNonQuery(sql, valores);
        return result;
    }

    toMap(rows) {

        if (rows && typeof rows.length == "number") {
            let lista = [];
            for (let i = 0; i < rows.length; i++) {
                let row = rows[i];
                let jogo = new jogoEntity()
                jogo.jogId = row["jog_id"];
                jogo.jogDtinicio = row["jog_dtinicio"];
                jogo.jogDtfim = row["jog_dtfim"];
                jogo.sala = new salaRepository();
                jogo.sala.salId = row["sal_id"];
                jogo.sala.salNome = row["sal_nome"];
                jogo.sala.usuario.usuId = row["usu_id"];

                lista.push(jogo);
            }
            return lista;
        } else if (rows) {
            let jogo = new jogoEntity();
            jogo.jogId = rows["jog_id"];
            jogo.jogDtinicio = rows["jog_dtinicio"];
            jogo.jogDtfim = rows["jog_dtfim"];
            jogo.sala = new salaRepository();
            jogo.sala.salId = rows["sal_id"];
            jogo.sala.salNome = rows["sal_nome"];
            jogo.sala.usuario.usuId = rows["usu_id"];

            return jogo;
        } else {
            return null;
        }
    }
};