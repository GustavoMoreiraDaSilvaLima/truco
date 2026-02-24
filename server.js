import express from 'express';
import swaggerUi from 'swagger-ui-express'
import routerUsuarios from './routes/usuarioRoute.js';
import routerSala from './routes/salaRoute.js';
import routerRodada from './routes/rodadaRoute.js';
import routerParticipante from './routes/participanteRoute.js';
import routerMovimentacao from './routes/movimentacaoRoute.js';
import routerMao from './routes/maoRoute.js';
import routerJogo from './routes/jogoRoute.js';
import routerEquipe from './routes/equipeRoute.js';
import routerAutenticacao from './routes/autenticacaoRoute.js';
import routerCarta from './routes/cartaRoute.js';
import http from 'http'
import socketInit from './socket/jogoSocket.js'
import { Server } from 'socket.io';

import cookieParser from 'cookie-parser';
import { createRequire } from "module";
import cors from 'cors';
import dotenv from "dotenv";
dotenv.config();

import DatabaseInitializer from './db/DatabaseInitializer.js';

try {
    const dbInit = new DatabaseInitializer();
    if (await dbInit.init()) {
        const require = createRequire(import.meta.url);
        const outputJson = require("./swagger-output.json");

        const app = express();
        const server = http.createServer(app);
        app.use(express.urlencoded({ extended: true }));
        app.use(cors({ origin: "http://localhost:3000", credentials: true }));
        app.use(cookieParser());
        app.use(express.json());

        const io = new Server(server, {
            cors: {
                origin: "http://localhost:3000"
            }
        });

        socketInit(io);

        app.use("/docs", swaggerUi.serve, swaggerUi.setup(outputJson));

        //rotas
        app.use("/usuarios", routerUsuarios);
        app.use("/sala", routerSala);
        app.use("/login", routerAutenticacao);
        app.use("/mao", routerMao);
        app.use("/jogo", routerJogo);
        app.use("/rodada", routerRodada);
        app.use("/participante", routerParticipante);
        app.use("/movimentacao", routerMovimentacao);
        app.use("/equipe", routerEquipe);
        app.use("/carta", routerCarta);
        // server.listen(4000, function () {
        //     console.log("socket em funcionamento!");
        // });
        app.listen(5000, function () {
            console.log("servidor web em funcionamento!");
        });
        console.log("Banco de dados inicializado com sucesso!");
    } else {
        throw new Error("Banco de dados nao inicializado!");
    }

} catch (e) {
    console.log(e);
}
