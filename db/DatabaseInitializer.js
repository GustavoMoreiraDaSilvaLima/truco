import Database from "./database.js";

export default class DatabaseInitializer {

    #db;

    constructor() {
        this.#db = new Database();
    }

    async init() {
        try {
            const queries = this.getTablesSQL();

            for (const sql of queries) {
                await this.#db.ExecutaComando(sql);
            }

            console.log("Tabelas inicializadas com sucesso!");
        } catch (e) {
            console.error("Erro ao inicializar banco:", e);
        }
    }

    getTablesSQL() {
        return [
            this.createUsuarioTable(),
            this.createSalaTable(),
            this.createCartaTable(),
            this.createParticipanteTable(),
            this.createEquipeTable(),
            this.createJogoTable(),
            this.createMaoTable(),
            this.createRodadaTable(),
            this.createRodadaTable()
        ];
    }

    createUsuarioTable() {
        return `
            CREATE TABLE IF NOT EXISTS "tb_usuario" (
            "usu_id" int NOT NULL AUTO_INCREMENT,
            "usu_nome" varchar(100) DEFAULT NULL,
            "usu_email" varchar(100) DEFAULT NULL,
            "usu_senha" varchar(200) DEFAULT NULL,
            PRIMARY KEY ("usu_id")
            ) 
        `;
    }

    createSalaTable() {
        return `
            CREATE TABLE IF NOT EXISTS "tb_sala" (
            "sal_id" int NOT NULL AUTO_INCREMENT,
            "sal_nome" varchar(200) DEFAULT NULL,
            "usu_id" int DEFAULT NULL,
            PRIMARY KEY ("sal_id"),
            KEY "fk_sala_usuario_idx" ("usu_id"),
            CONSTRAINT "fk_sala_usuario" FOREIGN KEY ("usu_id") REFERENCES "tb_usuario" ("usu_id")
            )
        `;
    }

    createCartaTable() {
        return `
            CREATE TABLE IF NOT EXISTS "tb_carta" (
            "car_id" int NOT NULL AUTO_INCREMENT,
            "car_codigo" varchar(10) DEFAULT NULL,
            "car_imagem" varchar(200) DEFAULT NULL,
            "car_valor" int DEFAULT NULL,
            "car_naipe" varchar(20) DEFAULT NULL,
            "car_vira" varchar(1) DEFAULT NULL,
            "par_id" int DEFAULT NULL,
            "mao_id" int DEFAULT NULL,
            PRIMARY KEY ("car_id"),
            KEY "fk_carta_participante_idx" ("par_id"),
            KEY "fk_carta_rodada_idx" ("mao_id"),
            CONSTRAINT "fk_carta_mao" FOREIGN KEY ("mao_id") REFERENCES "tb_mao" ("mao_id"),
            CONSTRAINT "fk_carta_participante" FOREIGN KEY ("par_id") REFERENCES "tb_participante" ("par_id")
            )
        `;
    }

    createParticipanteTable() {
        return `
            CREATE TABLE IF NOT EXISTS "tb_participante" (
            "par_id" int NOT NULL AUTO_INCREMENT,
            "par_dtentrada" datetime DEFAULT NULL,
            "par_dtsaida" datetime DEFAULT NULL,
            "usu_id" int DEFAULT NULL,
            "sal_id" int DEFAULT NULL,
            "eqp_id" int DEFAULT NULL,
            PRIMARY KEY ("par_id"),
            KEY "fk_participante_usuario" ("usu_id"),
            KEY "fk_participante_sala" ("sal_id"),
            KEY "fk_participante_equipe" ("eqp_id"),
            CONSTRAINT "fk_participante_equipe" FOREIGN KEY ("eqp_id") REFERENCES "tb_equipe" ("eqp_id"),
            CONSTRAINT "fk_participante_sala" FOREIGN KEY ("sal_id") REFERENCES "tb_sala" ("sal_id"),
            CONSTRAINT "fk_participante_usuario" FOREIGN KEY ("usu_id") REFERENCES "tb_usuario" ("usu_id")
            )
        `;
    }

    createEquipeTable() {
        return `
            CREATE TABLE IF NOT EXISTS "tb_equipe" (
            "eqp_id" int NOT NULL AUTO_INCREMENT,
            "eqp_descricao" varchar(50) DEFAULT NULL,
            PRIMARY KEY ("eqp_id")
            )
        `;
    }

    createJogoTable() {
        return `
            CREATE TABLE IF NOT EXISTS "tb_jogo" (
            "jog_id" int NOT NULL AUTO_INCREMENT,
            "jog_dtinicio" datetime DEFAULT NULL,
            "jog_dtfim" datetime DEFAULT NULL,
            "sal_id" int DEFAULT NULL,
            PRIMARY KEY ("jog_id"),
            KEY "fk_jogo_sala" ("sal_id"),
            CONSTRAINT "fk_jogo_sala" FOREIGN KEY ("sal_id") REFERENCES "tb_sala" ("sal_id")
            )
        `;
    }

    createMaoTable() {
        return `
            CREATE TABLE IF NOT EXISTS "tb_mao" (
            "mao_id" int NOT NULL AUTO_INCREMENT,
            "mao_ordem" int DEFAULT NULL,
            "mao_codigobaralho" varchar(50) DEFAULT NULL,
            "mao_trucada" varchar(1) DEFAULT NULL,
            "mao_valor" int DEFAULT NULL,
            "jog_id" int DEFAULT NULL,
            "eqp_vencedora" int DEFAULT NULL,
            PRIMARY KEY ("mao_id"),
            KEY "fk_mao_jogo" ("jog_id"),
            KEY "fk_mao_equipe" ("eqp_vencedora"),
            CONSTRAINT "fk_mao_equipe" FOREIGN KEY ("eqp_vencedora") REFERENCES "tb_equipe" ("eqp_id"),
            CONSTRAINT "fk_mao_jogo" FOREIGN KEY ("jog_id") REFERENCES "tb_jogo" ("jog_id")
            )
        `
    }

    createMovimentacaoTable() {
        return `
            CREATE TABLE IF NOT EXISTS "tb_movimentacao" (
            "mov_id" int NOT NULL AUTO_INCREMENT,
            "mov_ordem" int DEFAULT NULL,
            "mov_correu" varchar(1) DEFAULT NULL,
            "mov_trucou" varchar(1) DEFAULT NULL,
            "car_id" int DEFAULT NULL,
            "rod_id" int DEFAULT NULL,
            "par_id" int DEFAULT NULL,
            PRIMARY KEY ("mov_id"),
            KEY "fk_movimentacao_carta" ("car_id"),
            KEY "fk_movimentacao_participante_idx" ("par_id"),
            KEY "fk_movimentacao_subrodada_idx" ("rod_id"),
            CONSTRAINT "fk_movimentacao_carta" FOREIGN KEY ("car_id") REFERENCES "tb_carta" ("car_id"),
            CONSTRAINT "fk_movimentacao_participante" FOREIGN KEY ("par_id") REFERENCES "tb_participante" ("par_id"),
            CONSTRAINT "fk_movimentacao_rodada" FOREIGN KEY ("rod_id") REFERENCES "tb_rodada" ("rod_id")
            )
        `
    }

    createRodadaTable() {
        return `
            CREATE TABLE IF NOT EXISTS "tb_rodada" (
            "rod_id" int NOT NULL AUTO_INCREMENT,
            "mao_id" int DEFAULT NULL,
            "eqp_vencedora" int DEFAULT NULL,
            PRIMARY KEY ("rod_id"),
            KEY "fk_subrodada_rodada_idx" ("mao_id"),
            KEY "fk_subrodada_equipe_idx" ("eqp_vencedora"),
            CONSTRAINT "fk_rodada_equipe" FOREIGN KEY ("eqp_vencedora") REFERENCES "tb_equipe" ("eqp_id"),
            CONSTRAINT "fk_rodada_mao" FOREIGN KEY ("mao_id") REFERENCES "tb_mao" ("mao_id")
            )
            `
    }
}