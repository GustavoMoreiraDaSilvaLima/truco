import usuarioEntity from "../entities/usuarioEntity.js";
import BaseRepository from "./baseRepository.js";
export default class usuarioRepository extends BaseRepository {

    constructor(db) {
        super(db);
    }

    async listar() {
        let sql = "select * from tb_usuario";
        let rows = await this.db.ExecutaComando(sql);
        return this.toMap(rows);
    }

    async obter(id) {
        let sql = "select * from tb_usuario where usu_id = ?";
        let valores = [id];
        let row = await this.db.ExecutaComando(sql, valores);
        return this.toMap(row[0]);
    }

    async validarAcesso(email, senha){
        let sql = "select * from tb_usuario where usu_email = ? and usu_senha = ?";
        let valores = [email, senha]; 
        let row = await this.db.ExecutaComando(sql,valores)
        return this.toMap(row[0]);
    }

    async gravar(entidade) {
        let sql = "insert into tb_usuario (usu_nome, usu_email, usu_senha) values (?, ?, ?)";
        let valores = [entidade.usuNome, entidade.usuEmail, entidade.usuSenha];
        let result = await this.db.ExecutaComandoNonQuery(sql, valores);
        return result;
    }

    async alterar(entidade) {
        let sql = "update tb_usuario set usu_nome = ?, usu_email = ?, usu_senha = ? where usu_id = ?;";
        let valores = [entidade.usuNome, entidade.usuEmail, entidade.usuSenha, entidade.usuId];
        let result = await this.db.ExecutaComandoNonQuery(sql, valores);
        return result;
    }

    async alteracaoParcial(entidade) {

        let sql = `update tb_usuario set usu_nome = coalesce(?, usu_nome),
                                         usu_email = coalesce(?, usu_email),
                                         usu_senha = coalesce(?, usu_senha)
                    where usu_id = ?`;

        let valores = [entidade.usuNome, entidade.usuEmail, entidade.usuSenha, entidade.usuId];

        let result = await this.db.ExecutaComandoNonQuery(sql, valores);

        return result;
    }

    async deletar(id) {
        let sql = "delete from tb_usuario where usu_id = ?";
        let valores = [id];
        let result = await this.db.ExecutaComandoNonQuery(sql, valores);
        return result;
    }

    toMap(rows) {

        if (rows && typeof rows.length == "number") {
            let lista = [];
            for (let i = 0; i < rows.length; i++) {
                let row = rows[i];
                let usuario = new usuarioEntity();
                usuario.usuId = row["usu_id"];
                usuario.usuNome = row["usu_nome"];
                usuario.usuEmail = row["usu_email"];
                usuario.usuSenha = row["usu_senha"];

                lista.push(usuario);
            }

            return lista;
        }
        else if (rows) {
            let usuario = new usuarioEntity();
            usuario.usuId = rows["usu_id"];
            usuario.usuNome = rows["usu_nome"];
            usuario.usuEmail = rows["usu_email"];
            usuario.usuSenha = rows["usu_senha"];

            return usuario;
        }
        else {
            return null;
        }
    }
}

