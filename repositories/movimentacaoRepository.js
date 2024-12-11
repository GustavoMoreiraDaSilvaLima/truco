import movimentacaoEntity from '../entities/movimentacaoEntity.js';
import BaseRepository from './baseRepository.js';
import participanteRepository from './participanteRepository.js';
import cartaRepository from './cartaRepository.js';
import rodadaRepository from '../entities/rodadaEntity.js';

export default class movimentacaoRepository extends BaseRepository {

    constructor(db) {
        super(db);
    }

    async listar() {
        let sql = `select * from tb_movimentacao as mov inner join tb_carta as car on mov.car_id = car.car_id
                                                        inner join tb_participante as par on mov.par_id = par.par_id
                                                        inner join tb_rodada as rod on mov.rod_id = rod.rod_id;`;
        let rows = await this.db.ExecutaComando(sql);
        return this.toMap(rows);
    }

    async obter(id) {
        let sql = "select * from tb_movimentacao where mov_id = ?";
        let valores = [id];
        let row = await this.db.ExecutaComando(sql, valores);
        return this.toMap(row[0]);
    }

    async gravar(entidade) {
        let sql = "insert into tb_movimentacao (mov_ordem, mov_correu, mov_trucou, car_id, rod_id, par_id) values (?,?,?,?,?,?)";
        let valores = [entidade.movOrdem, entidade.movCorreu, entidade.movTrucou, entidade.carta.carId, entidade.rodada.rodId, entidade.participante.parId];
        let result = await this.db.ExecutaComandoNonQuery(sql, valores);
        return result;
    }

    async alterar(entidade) {
        let sql = "update tb_movimentacao set mov_ordem = ?, mov_correu = ?, mov_trucou = ?, car_id = ?, rod_id = ?, par_id = ? where mov_id = ?;";
        let valores = [entidade.movOrdem, entidade.movCorreu, entidade.movTrucou, entidade.carta.carId, entidade.rodada.rodId, entidade.participante.parId, entidade.movId];
        let result = await this.db.ExecutaComandoNonQuery(sql, valores);
        return result;
    }

    async alterarParcialmente(entidade) {
        let sql = `update tb_movimentacao set movOrdem = coalesce(?, movOrdem),
                                         movCorreu = coalesce(?, movCorreu),
                                         movTrucou = coalesce(?, movTrucou),
                                         car_id = coalesce(?, car_naipe),
                                         rod_id = coalesce(?, rod_id),
                                         par_id = coalesce(?, par_id)
                    where mov_id = ?`;
        let valores = [entidade.movOrdem, entidade.movCorreu, entidade.movTrucou, entidade.carta.carId, entidade.rodada.rodId, entidade.participante.parId, entidade.movId]
        let result = await this.db.ExecutaComandoNonQuery(sql, valores);
        return result;
    }

    async delete(id) {
        let sql = "delete from tb_movimentacao where mov_id = ?";

        let valores = [id];

        let result = await this.db.ExecutaComandoNonQuery(sql, valores);

        return result;
    }

    async InserirMovimentoParticipante(participante, ordem, rodada) {
        const sql = `insert into tb_movimentacao (rod_id, par_id, mov_ordem) values (?, ?, ?)`;
        const valores = [rodada, participante, ordem];
        const result = await this.db.ExecutaComandoNonQuery(sql, valores);
        return result;
    }

    async VerificarMovimento(rodada) {
        const sql = `select * from tb_movimentacao where rod_id = ? and car_id is null order by mov_ordem asc limit 1`;
        const valores = [rodada];
        const row = await this.db.ExecutaComando(sql, valores);
        return row[0].par_id;
    }

    async InserirJogadaParticipante(participante, carta, rodada) {
        const sql = `update tb_movimentacao set car_id = ? where par_id = ? and car_id is null and rod_id = ?`;
        const valores = [carta, participante, rodada];
        const result = await this.db.ExecutaComandoNonQuery(sql, valores);
        return result;
    }


    async PegarCartasNovas(usuario) {
        const sql = `SELECT *
            FROM tb_carta c
            LEFT JOIN tb_movimentacao m ON m.car_id = c.car_id
            WHERE c.par_id = ? AND m.car_id IS NULL limit 2 order by c.car_id;`
        const valores = [usuario];
        const rows = await this.db.ExecutaComando(sql, valores);
        return rows;
    }

    toMap(rows) {

        if (rows && typeof rows.length == "number") {
            let lista = [];
            for (let i = 0; i < rows.length; i++) {
                let row = rows[i];
                let movimentacao = new movimentacaoEntity()
                movimentacao.movId = row["mov_id"];
                movimentacao.movOrdem = row["mov_ordem"];
                movimentacao.movCorreu = row["mov_correu"];
                movimentacao.movTrucou = row["mov_trucou"];
                movimentacao.carta = new cartaRepository();
                movimentacao.carta.carId = row["car_id"];
                movimentacao.carta.carCodigo = row["car_codigo"];
                movimentacao.carta.carImagem = row["car_imagem"];
                movimentacao.carta.carValor = row["car_valor"];
                movimentacao.carta.carNaipe = row["car_naipe"];
                movimentacao.carta.carVira = row["car_vira"];
                movimentacao.rodada = new rodadaRepository();
                movimentacao.rodada.rodId = row["rod_id"];
                movimentacao.participante = new participanteRepository();
                movimentacao.participante.parId = row["par_id"];
                movimentacao.participante.dtEntrada = row["par_dtentrada"];
                movimentacao.participante.dtSaida = row["par_dtsaida"];

                lista.push(movimentacao);
            }
            return lista;
        } else if (rows) {
            let movimentacao = new movimentacaoEntity()
            movimentacao.movId = rows["mov_id"];
            movimentacao.movOrdem = rows["mov_ordem"];
            movimentacao.movCorreu = rows["mov_correu"];
            movimentacao.movTrucou = rows["mov_trucou"];
            movimentacao.carta = new cartaRepository();
            movimentacao.carta.carId = rows["car_id"];
            movimentacao.carta.carCodigo = rows["car_codigo"];
            movimentacao.carta.carImagem = rows["car_imagem"];
            movimentacao.carta.carValor = rows["car_valor"];
            movimentacao.carta.carNaipe = rows["car_naipe"];
            movimentacao.carta.carVira = rows["car_vira"];
            movimentacao.rodada = new rodadaRepository();
            movimentacao.rodada.rodId = rows["rod_id"];
            movimentacao.participante = new participanteRepository();
            movimentacao.participante.parId = rows["par_id"];
            movimentacao.participante.dtEntrada = rows["par_dtentrada"];
            movimentacao.participante.dtSaida = rows["par_dtsaida"];

            return movimentacao;
        } else {
            return null;
        }
    }
};