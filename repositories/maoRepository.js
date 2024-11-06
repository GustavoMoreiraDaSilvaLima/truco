import maoEntity from '../entities/maoEntity.js';
import BaseRepository from './baseRepository.js';
import jogoRepository from './jogoRepository.js';
import equipeRepository from './equipeRepository.js';

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
                mao.jogo = new jogoRepository();
                mao.jogo.jogId
                mao.jogo.jogDtinicio = row["jog_dtinicio"];
                mao.jogo.jogDtfim = row["jogo_dtfim"];
                mao.jogo.sala.salId = row["sal_id"];
                mao.equipe = new equipeRepository();
                mao.equipe.eqpId = row["eqp_id"];
                mao.equipe.eqpDescricao = row["eqp_descricao"];

                lista.push(mao);
            }
            return lista;
        } else if (rows) {
            let mao = new maoEntity()
            mao.maoId = row["mao_id"];
            mao.maoOrdem = row["mao_ordem"];
            mao.maoCodigoBaralho = row["mao_codigobaralho"];
            mao.maoTrucada = row["mao_trucada"]
            mao.maoValor = row["mao_valor"];
            mao.jogo = new jogoRepository();
            mao.jogo.jogDtinicio = row["jog_dtinicio"];
            mao.jogo.jogDtfim = row["jogo_dtfim"];
            mao.jogo.sala.salId = row["sal_id"];
            mao.equipe = new equipeRepository();
            mao.equipe.eqpId = row["eqp_id"];
            mao.equipe.eqpDescricao = row["eqp_descricao"];

            return mao;
        } else {
            return null;
        }
    }
};