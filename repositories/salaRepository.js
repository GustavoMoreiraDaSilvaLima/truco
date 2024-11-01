import salaEntity from '../entities/salaEntity.js';
import BaseRepository from './baseRepository.js';
import usuarioRepository from './usuarioRepository.js';

export default class salaRepository extends BaseRepository {

    constructor(db) {
        super(db);
    }

    async listar() {
        let sql = "select * from tb_sala as sal inner join tb_usuario as usu on sal.usu_id = usu.usu_id";
        let rows = await this.db.ExecutaComando(sql);
        return this.toMap(rows);
    }

    async obter(id) {
        let sql = "select * from tb_sala where sal_id = ?";
        let valores = [id];
        let row = await this.db.ExecutaComando(sql, valores);
        return this.toMap(row[0]);
    }

    async gravar(entidade) {
        let sql = "insert into tb_sala (sal_nome, usu_id) values (?, ?)";
        let valores = [entidade.salNome, entidade.usuario.id];
        let result = await this.db.ExecutaComandoNonQuery(sql, valores);
        return result;
    }

    async alterar(entidade) {
        let sql = "update tb_sala set sal_nome = ?, usu_id = ? where sal_id = ?;";
        let valores = [entidade.salNome, entidade.usuario.id, entidade.salId];
        let result = await this.db.ExecutaComandoNonQuery(sql, valores);
        return result;
    }

    async alterarParcialmente(entidade) {
        let sql = `update tb_sala set sal_nome = coalesce(?, sal_nome),
                                         usu_id = coalesce(?, usu_id)
                    where sal_id = ?`;
        let valores = [entidade.salNome, entidade.usuario.id]
        let result = await this.db.ExecutaComandoNonQuery(sql, valores);
        return result;
    }

    async delete(id) {
        let sql = "delete from tb_sala where sal_id = ?";
        
        let valores = [id];

        let result = await this.db.ExecutaComandoNonQuery(sql, valores);
        
        return result;
    }

    toMap(rows) {

        if(rows && typeof rows.length == "number") {
            let lista = [];
            for(let i = 0; i < rows.length; i++) {
                let row = rows[i];
                let sala = new salaEntity()
                sala.salId = row["sal_id"];
                sala.salNome = row["sal_nome"];
                sala.usuario = new usuarioRepository();
                sala.usuario.usuId = row["usu_id"];
                sala.usuario.usuNome = row["usu_nome"];
                sala.usuario.usuEmail = row["usu_email"];

                lista.push(sala);
            }
            return lista;
        } else if (rows) {
            let sala = new salaEntity();
            sala.salId = rows["sal_id"];
            sala.salNome = rows["sal_nome"];
            sala.usuario = new usuarioRepository();
            sala.usuario.usuId = rows["usu_id"];
            sala.usuario.usuNome = rows["usu_nome"];
            sala.usuario.usuEmail = rows["usu_email"];

            return sala;
        } else { 
            return null;
        }
    }
};