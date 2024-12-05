import participanteEntity from '../entities/participanteEntity.js';
import BaseRepository from './baseRepository.js';
import usuarioRepository from './usuarioRepository.js';
import salaRepository from './salaRepository.js';
import equipeRepository from './equipeRepository.js';

export default class participanteRepository extends BaseRepository {

    constructor(db) {
        super(db);
    }

    async listar() {
        let sql = `select * from tb_participante as par 
                                inner join tb_usuario as usu on par.usu_id = usu.usu_id 
                                inner join tb_sala as sal on par.sal_id = sal.sal_id
                                inner join tb_equipe as eqp on par.eqp_id = eqp.eqp_id;`;

        let rows = await this.db.ExecutaComando(sql);
        return this.toMap(rows);
    }

    async obter(id) {
        let sql = `select * from tb_participante as par 
                                inner join tb_usuario as usu on par.usu_id = usu.usu_id 
                                inner join tb_sala as sal on par.sal_id = sal.sal_id
                                inner join tb_equipe as eqp on par.eqp_id = eqp.eqp_id where par_id = ?;`;
        let valores = [id];
        let row = await this.db.ExecutaComando(sql, valores);
        return this.toMap(row[0]);  
    }

    async gravar(entidade) {
        let sql = "insert into tb_participante (par_dtentrada, usu_id, sal_id, eqp_id) values (NOW(), ?, ?, ?);";
        let valores = [entidade.usuario.usuId, entidade.sala.salId, entidade.equipe ? entidade.equipe.eqpId : null];
        let result = await this.db.ExecutaComandoNonQuery(sql, valores);
        return result;
    }

    async sair(id, sala) {
        let sql = "update tb_participante set par_dtsaida = NOW() where usu_id = ? and sal_id = ?;";
        let valores = [id, sala];
        let result = await this.db.ExecutaComandoNonQuery(sql, valores);
        return result;
    }

    async alterar(entidade) {
        let sql = "update tb_participante set par_dtentrada = ?, par_dtsaida = ?, usu_id = ?, sal_id = ?, eqp_id = ? where par_id = ?;";
        let valores = [entidade.dtEntrada ? entidade.dtEntrada : null, entidade.dtSaida ? entidade.dtSaida : null, entidade.usuario.usuId, entidade.sala.salId, entidade.equipe.eqpId, entidade.parId];
        let result = await this.db.ExecutaComandoNonQuery(sql, valores);
        return result;
    }

    async alterarParcialmente(entidade) {
        let sql = `update tb_participante set par_dtentrada = coalesce(?, par_dtentrada),
                                         par_dtsaida = coalesce(?, par_dtsaida),
                                         usu_id = coalesce(?, usu_id),
                                         sal_id = coalesce(?, sal_id),
                                         eqp_id = coalesce(?, eqp_id)
                    where par_id = ?`;
        let valores = [entidade.dtEntrada, entidade.dtSaida, entidade.usuario ? entidade.usuario.usuId : null, entidade.sala ? entidade.sala.salId : null, entidade.equipe ? entidade.equipe.eqpId : null, entidade.parId]
        let result = await this.db.ExecutaComandoNonQuery(sql, valores);
        return result;
    }

    async delete(id) {
        let sql = "delete from tb_participante where par_id = ?";

        let valores = [id];

        let result = await this.db.ExecutaComandoNonQuery(sql, valores);

        return result;
    }



    async obterQuantidadePorSala(Id){
        let sql = "select count(*) as total from tb_participante where sal_id = ? and par_dtsaida is null; ";
        let valores = [Id];
        let row = await this.db.ExecutaComando(sql, valores);
        return row[0].total;
    }

    async obterParticipanteSala(user, sala){
        let sql = "select * from tb_participante where usu_id = ? and sal_id = ? and par_dtsaida is null; ";
        let valores = [user, sala];
        let row = await this.db.ExecutaComando(sql, valores);
        return this.toMap(row[0]);
    }
    toMap(rows) {

        if (rows && typeof rows.length == "number") {
            let lista = [];
            for (let i = 0; i < rows.length; i++) {
                let row = rows[i];
                let participante = new participanteEntity()
                participante.parId = row["par_id"];
                participante.dtEntrada = row["par_dtentrada"];
                participante.dtSaida = row["par_dtsaida"];
                participante.usuario = new usuarioRepository();
                participante.usuario.usuId = row["usu_id"];
                participante.usuario.usuNome = row["usu_nome"];
                participante.usuario.usuEmail = row["usu_email"];
                participante.usuario.usuSenha = row["usu_senha"];
                participante.sala = new salaRepository();
                participante.sala.salId = row["sal_id"];
                participante.sala.salNome = row["sal_nome"];
                participante.equipe = new equipeRepository();
                participante.equipe.eqpId = row["eqp_id"];
                participante.equipe.eqpDescricao = row["eqp_descricao"];

                lista.push(participante);
            }
            return lista;
        } else if (rows) {
            let participante = new participanteEntity();
            participante.parId = rows["par_id"];
            participante.dtEntrada = rows["par_dtentrada"];
            participante.dtSaida = rows["par_dtsaida"];
            participante.usuario = new usuarioRepository();
            participante.usuario.usuId = rows["usu_id"];
            participante.usuario.usuNome = rows["usu_nome"];
            participante.usuario.usuEmail = rows["usu_email"];
            participante.usuario.usuSenha = rows["usu_senha"];
            participante.sala = new salaRepository();
            participante.sala.salId = rows["sal_id"];
            participante.sala.salNome = rows["sal_nome"];
            participante.equipe = new equipeRepository();
            participante.equipe.eqpId = rows["eqp_id"];
            participante.equipe.eqpDescricao = rows["eqp_descricao"];

            return participante;
        } else {
            return null;
        }
    }
};