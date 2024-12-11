import rodadaEntity from '../entities/rodadaEntity.js';
import BaseRepository from './baseRepository.js';
import maoRepository from './maoRepository.js';
import equipeRepository from './equipeRepository.js';

export default class rodadaRepository extends BaseRepository {

    constructor(db) {
        super(db);
    }

    async listar() {
        let sql = `select * from tb_rodada as rod  
                                inner join tb_mao as mao on rod.mao_id = mao.mao_id
                                inner join tb_equipe as eqp on rod.eqp_id = eqp.eqp_id;`;

        let rows = await this.db.ExecutaComando(sql);
        return this.toMap(rows);
    }

    async obter(id) {
        let sql = "select * from tb_rodada where rod_id = ?";
        let valores = [id];
        let row = await this.db.ExecutaComando(sql, valores);
        return this.toMap(row[0]);
    }

    async gravar(entidade) {
        let sql = "insert into tb_rodada (rod_id, mao_id, eqp_id) values (?, ?, ?);";
        let valores = [entidade.rodId, entidade.mao.maoId, entidade.equipe.eqpId];
        let result = await this.db.ExecutaComandoNonQuery(sql, valores);
        return result;
    }

    async alterar(entidade) {
        let sql = "update tb_rodada set mao_id = ?, eqp_id = ? where rod_id = ?;";
        let valores = [entidade.mao.maoId, entidade.equipe.eqpId, entidade.rodId];
        let result = await this.db.ExecutaComandoNonQuery(sql, valores);
        return result;
    }

    async alterarParcialmente(entidade) {
        let sql = `update tb_rodada set mao_id = coalesce(?, mao_id),
                                        eqp_id = coalesce(?, eqp_id)
                    where rod_id = ?`;
        let valores = [entidade.mao.maoId, entidade.equipe.eqpId, entidade.rodId]
        let result = await this.db.ExecutaComandoNonQuery(sql, valores);
        return result;
    }

    async delete(id) {
        let sql = "delete from tb_rodada where rod_id = ?";

        let valores = [id];

        let result = await this.db.ExecutaComandoNonQuery(sql, valores);

        return result;
    }

    async GravarRodada(maoId){
        let sql = 'insert into tb_rodada (mao_id) values (?);';
        let valores = [maoId];
        let result = await this.db.ExecutaComandoLastInserted(sql, valores);
        return result;
    }

    toMap(rows) {

        if (rows && typeof rows.length == "number") {
            let lista = [];
            for (let i = 0; i < rows.length; i++) {
                let row = rows[i];
                let rodada = new rodadaEntity()
                rodada.rodId = row["rod_id"];
                rodada.mao = new maoRepository();
                rodada.mao.maoId = row["mao_id"];
                rodada.mao.maoOrdem = row["mao_ordem"];
                rodada.mao.maoCodigoBaralho = row["mao_codigobaralho"];
                rodada.mao.maoTrucada = row["mao_trucada"];
                rodada.mao.maoValor = row["mao_valor"];
                rodada.equipe = new equipeRepository();
                rodada.equipe.eqpId = row["eqp_id"];
                rodada.equipe.eqpDescricao = row["eqp_descricao"];

                lista.push(rodada);
            }
            return lista;
        } else if (rows) {
            let rodada = new rodadaEntity()
            rodada.rodId = row["rod_id"];
            rodada.mao = new maoRepository();
            rodada.mao.maoId = row["mao_id"];
            rodada.mao.maoOrdem = row["mao_ordem"];
            rodada.mao.maoCodigoBaralho = row["mao_codigobaralho"];
            rodada.mao.maoTrucada = row["mao_trucada"];
            rodada.mao.maoValor = row["mao_valor"];
            rodada.equipe = new equipeRepository();
            rodada.equipe.eqpId = row["eqp_id"];
            rodada.equipe.eqpDescricao = row["eqp_descricao"];

            return rodada;
        } else {
            return null;
        }
    }
};