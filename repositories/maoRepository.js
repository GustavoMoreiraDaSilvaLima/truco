import maoEntity from '../entities/maoEntity.js';
import BaseRepository from './baseRepository.js';
import jogoRepository from './jogoRepository.js';
import equipeRepository from './equipeRepository.js';
import JogoEntity from '../entities/jogoEntity.js';
import equipeEntity from '../entities/equipeEntity.js';

export default class maoRepository extends BaseRepository {

    constructor(db) {
        super(db);
    }

    async listar() {
        let sql = `select * from tb_mao as mao  
                                inner join tb_jogo as jog on mao.jog_id = jog.jog_id
                                inner join tb_equipe as eqp on mao.eqp_id = eqp.eqp_id;`;

        let rows = await this.db.ExecutaComando(sql);
        return this.toMap(rows);
    }

    async obter(id) {
        let sql = "select * from tb_mao where mao_id = ?";
        let valores = [id];
        let row = await this.db.ExecutaComando(sql, valores);
        return this.toMap(row[0]);
    }

    async gravar(entidade) {
        let sql = "insert into tb_mao (mao_ordem, mao_codigobaralho, mao_trucada, mao_valor, jog_id, eqp_id) values (?, ?, ?, ?, ?, ?);";
        let valores = [entidade.maoOrdem, entidade.maoCodigoBaralho, entidade.maoTrucada, entidade.maoValor, entidade.jogo.jogId, entidade.equipe.eqpId];
        let result = await this.db.ExecutaComandoNonQuery(sql, valores);
        return result;
    }

    async alterar(entidade) {
        let sql = "update tb_mao set mao_ordem = ?, mao_codigobaralho = ?, mao_trucada = ?, mao_valor = ?, jog_id = ?, eqp_id = ? where mao_id = ?;";
        let valores = [entidade.maoOrdem, entidade.maoCodigoBaralho, entidade.maoTrucada, entidade.maoValor, entidade.jogo.jogId, entidade.equipe.eqpId, entidade.maoId];
        let result = await this.db.ExecutaComandoNonQuery(sql, valores);
        return result;
    }

    async alterarParcialmente(entidade) {
        let sql = `update tb_mao set mao_ordem = coalesce(?, mao_ordem),
                                        mao_codigobaralho = coalesce(?, mao_codigobaralho),
                                        mao_trucada = coalesce(?, mao_trucada),
                                        mao_valor = coalesce(?, mao_valor),
                                        jog_id = coalesce(?, jog_id),
                                        eqp_id = coalesce(?, eqp_id)
                    where mao_id = ?`;
        let valores = [entidade.maoOrdem, entidade.maoCodigoBaralho, entidade.maoTrucada, entidade.maoValor, entidade.jogo.jogId, entidade.equipe.eqpId, entidade.maoId]
        let result = await this.db.ExecutaComandoNonQuery(sql, valores);
        return result;
    }

    async delete(id) {
        let sql = "delete from tb_mao where mao_id = ?";

        let valores = [id];

        let result = await this.db.ExecutaComandoNonQuery(sql, valores);

        return result;
    }

    async GravarBaralho(baralho, jogo){
        const sql = "insert into tb_mao (mao_codigobaralho, jog_id, mao_trucada, mao_valor) values(?, ?, 'N', 1)";
        const valores = [baralho, jogo];
        const result = await this.db.ExecutaComandoLastInserted(sql, valores);
        return result;
    }

    async obterBaralho(sala, jogo){
        const sql = `select * from  tb_mao m 
        inner join tb_jogo j on m.jog_id = j.jog_id
        where j.sal_id = ? and j.jog_id = ? and eqp_vencedora is null`;
        const valores = [sala, jogo];
        const row = await this.db.ExecutaComando(sql, valores);
        return this.toMap(row[0]);
    }

    toMap(rows) {

        if (rows && typeof rows.length == "number") {
            let lista = [];
            for (let i = 0; i < rows.length; i++) {
                let row = rows[i];
                let mao = new maoEntity()
                mao.maoId = row["mao_id"];
                mao.maoOrdem = row["mao_ordem"];
                mao.maoCodigoBaralho = row["mao_codigobaralho"];
                mao.maoTrucada = row["mao_trucada"]
                mao.maoValor = row["mao_valor"];
                mao.jogo = new JogoEntity();
                mao.jogo.jogId
                mao.jogo.jogDtinicio = row["jog_dtinicio"];
                mao.jogo.jogDtfim = row["jogo_dtfim"];
                mao.jogo.salId = row["sal_id"];
                mao.equipe = new equipeEntity();
                mao.equipe.eqpId = row["eqp_id"];
                mao.equipe.eqpDescricao = row["eqp_descricao"];

                lista.push(mao);
            }
            return lista;
        } else if (rows) {
            let mao = new maoEntity()
            mao.maoId = rows["mao_id"];
            mao.maoOrdem = rows["mao_ordem"];
            mao.maoCodigoBaralho = rows["mao_codigobaralho"];
            mao.maoTrucada = rows["mao_trucada"]
            mao.maoValor = rows["mao_valor"];
            mao.jogo = new JogoEntity();
            mao.jogo.jogDtinicio = rows["jog_dtinicio"];
            mao.jogo.jogDtfim = rows["jogo_dtfim"];
            mao.jogo.salId = rows["sal_id"];
            mao.equipe = new equipeEntity();
            mao.equipe.eqpId = rows["eqp_id"];
            mao.equipe.eqpDescricao = rows["eqp_descricao"];

            return mao;
        } else {
            return null;
        }
    }
};