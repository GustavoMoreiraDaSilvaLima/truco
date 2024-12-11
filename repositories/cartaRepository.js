import cartaEntity from '../entities/cartaEntity.js';
import BaseRepository from './baseRepository.js';
import participanteRepository from './participanteRepository.js';
import maoRepository from './maoRepository.js';

export default class cartaRepository extends BaseRepository {

    constructor(db) {
        super(db);
    }

    async listar() {
        let sql = `select * from tb_carta as car inner join tb_participante as par on car.par_id = par.par_id
                                                 inner join tb_mao as mao on car.mao_id = mao.mao_id;`;
        let rows = await this.db.ExecutaComando(sql);
        return this.toMap(rows);
    }

    async obter(id) {
        let sql = "select * from tb_carta where car_id = ?";
        let valores = [id];
        let row = await this.db.ExecutaComando(sql, valores);
        return this.toMap(row[0]);
    }

    async gravar(entidade) {
        let sql = "insert into tb_carta (car_codigo, car_imagem, car_valor, car_naipe, car_vira, par_id, mao_id) values (?,?,?,?,?,?,?)";
        let valores = [entidade.carCodigo, entidade.carImagem, entidade.carValor, entidade.carNaipe, entidade.carVira, entidade.participante.parId, entidade.mao.maoId];
        let result = await this.db.ExecutaComandoNonQuery(sql, valores);
        return result;
    }

    async alterar(entidade) {
        let sql = "update tb_carta set car_codigo = ?, car_imagem = ?, car_valor = ?, car_naipe = ?, car_vira = ?, par_id = ?, mao_id = ? where car_id = ?;";
        let valores = [entidade.carCodigo, entidade.carImagem, entidade.carValor, entidade.carNaipe, entidade.carVira, entidade.participante.parId, entidade.mao.maoId, entidade.carId];
        let result = await this.db.ExecutaComandoNonQuery(sql, valores);
        return result;
    }

    async alterarParcialmente(entidade) {
        let sql = `update tb_carta set car_codigo = coalesce(?, car_codigo),
                                         car_imagem = coalesce(?, car_imagem),
                                         car_valor = coalesce(?, car_valor),
                                         car_naipe = coalesce(?, car_naipe),
                                         car_vira = coalesce(?, car_vira),
                                         par_id = coalesce(?, par_id),
                                         mao_id = coalesce(?, usu_id)
                    where car_id = ?`;
        let valores = [entidade.carCodigo, entidade.carImagem, entidade.carValor, entidade.carNaipe, entidade.carVira, entidade.participante.parId, entidade.mao.maoId, entidade.carta.carId]
        let result = await this.db.ExecutaComandoNonQuery(sql, valores);
        return result;
    }

    async delete(id) {
        let sql = "delete from tb_carta where car_id = ?";

        let valores = [id];

        let result = await this.db.ExecutaComandoNonQuery(sql, valores);

        return result;
    }

    async GravarCarta(Carta, usuario, mao) {
        const sql = `insert into tb_carta (car_codigo, car_imagem, car_valor, car_naipe, car_vira, par_id, mao_id) values(?, ?, ?, ?, ?, ?, ?)`;
        const valores = [Carta.code, Carta.image, Carta.value, Carta.suit, 'N', usuario, mao];
        const result = await this.db.ExecutaComandoNonQuery(sql, valores);
        return result;
    }

    //Altera o vira quando atingir as 12 cartas distribuidas, este metodo valida se alguma das cartas do usuario é vira
    async GravarVira(Vira, jogo, mao) {
        const sql = `update tb_carta c
        INNER JOIN tb_mao m ON c.mao_id = ?
        INNER JOIN tb_jogo j ON m.jog_id = ?
        set c.car_vira = 'S' 
        where c.car_codigo like '${Vira}%'`;
        const valores = [mao, jogo];
        const result = await this.db.ExecutaComandoNonQuery(sql, valores);
        return result;
    }

    async obterCarta(carta, participante) {
        let sql = "select * from tb_carta where car_codigo = ? and par_id = ?";
        let valores = [carta, participante];
        let row = await this.db.ExecutaComando(sql, valores);
        return this.toMap(row[0]);
    }


    toMap(rows) {

        if (rows && typeof rows.length == "number") {
            let lista = [];
            for (let i = 0; i < rows.length; i++) {
                let row = rows[i];
                let carta = new cartaEntity()
                carta.carId = row["car_id"];
                carta.carCodigo = row["car_codigo"];
                carta.carImagem = row["car_imagem"];
                carta.carValor = row["car_valor"];
                carta.carNaipe = row["car_naipe"];
                carta.carVira = row["car_vira"];
                carta.participante = new participanteRepository();
                carta.participante.parId = row["par_id"];
                carta.participante.dtEntrada = row["par_dtentrada"];
                carta.participante.dtSaida = row["par_dtsaida"];
                carta.mao = new maoRepository();
                carta.mao.maoId = row["mao_id"];
                carta.mao.maoOrdem = row["mao_ordem"];
                carta.mao.maoCodigoBaralho = row["mao_codigobaralho"];
                carta.mao.maoTrucada = row["mao_trucada"];
                carta.mao.maoValor = row["mao_valor"];


                lista.push(carta);
            }
            return lista;
        } else if (rows) {
            let carta = new cartaEntity()
            carta.carId = rows["car_id"];
            carta.carCodigo = rows["car_codigo"];
            carta.carImagem = rows["car_imagem"];
            carta.carValor = rows["car_valor"];
            carta.carNaipe = rows["car_naipe"];
            carta.carVira = rows["car_vira"];
            carta.participante = new participanteRepository();
            carta.participante.parId = rows["par_id"];
            carta.participante.dtEntrada = rows["par_dtentrada"];
            carta.participante.dtSaida = rows["par_dtsaida"];
            carta.mao = new maoRepository();
            carta.mao.maoId = rows["mao_id"];
            carta.mao.maoOrdem = rows["mao_ordem"];
            carta.mao.maoCodigoBaralho = rows["mao_codigobaralho"];
            carta.mao.maoTrucada = rows["mao_trucada"];
            carta.mao.maoValor = rows["mao_valor"];

            return carta;
        } else {
            return null;
        }
    }
};