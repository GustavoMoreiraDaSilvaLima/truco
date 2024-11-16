import equipeEntity from '../entities/equipeEntity.js';
import BaseRepository from './baseRepository.js';

export default class equipeRepository extends BaseRepository {

    constructor(db) {
        super(db);
    }

    async listar() {
        let sql = "select * from tb_equipe";
        let rows = await this.db.ExecutaComando(sql);
        return this.toMap(rows);
    }

    async obter(id) {
        let sql = "select * from tb_equipe where eqp_id = ?";
        let valores = [id];
        let row = await this.db.ExecutaComando(sql, valores);
        return this.toMap(row[0]);
    }

    async gravar(entidade) {
        let sql = "insert into tb_equipe (eqp_descricao) values (?)";
        let valores = [entidade.eqpDescricao];
        let result = await this.db.ExecutaComandoNonQuery(sql, valores);
        return result;
    }

    async alterar(entidade) {
        let sql = "update tb_equipe set eqp_descricao = ? where eqp_id = ?;";
        let valores = [entidade.eqpDescricao, entidade.eqpId];
        let result = await this.db.ExecutaComandoNonQuery(sql, valores);
        return result;
    }

    async alterarParcialmente(entidade) {
        let sql = `update tb_equipe set eqp_descricao = coalesce(?, eqp_descricao)
                    where eqp_id = ?`;
        let valores = [entidade.eqpDescricao, entidade.eqpId]
        let result = await this.db.ExecutaComandoNonQuery(sql, valores);
        return result;
    }

    async deletar(id) {
        let sql = "delete from tb_equipe where eqp_id = ?";

        let valores = [id];

        let result = await this.db.ExecutaComandoNonQuery(sql, valores);

        return result;
    }

    toMap(rows) {

        if (rows && typeof rows.length == "number") {
            let lista = [];
            for (let i = 0; i < rows.length; i++) {
                let row = rows[i];
                let equipe = new equipeEntity()
                equipe.eqpId = row["eqp_id"];
                equipe.eqpDescricao = row["eqp_descricao"];

                lista.push(equipe);
            }
            return lista;
        } else if (rows) {
            let equipe = new equipeEntity();
            equipe.eqpId = rows["eqp_id"];
            equipe.eqpDescricao = rows["eqp_descricao"];

            return equipe;
        } else {
            return null;
        }
    }
};