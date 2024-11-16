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


import cookieParser from 'cookie-parser';
import { createRequire } from "module";
import cors from 'cors';

const require = createRequire(import.meta.url);
const outputJson = require("./swagger-output.json");

const app = express();
app.use(express.urlencoded({ extended: true }));
app.use(cors({ origin: "http://localhost:3000", credentials: true }));
app.use(cookieParser());
app.use(express.json());

app.use("/docs", swaggerUi.serve, swaggerUi.setup(outputJson));

//rotas
app.use("/usuarios", routerUsuarios);
app.use("/sala", routerSala);
app.use("/login",routerAutenticacao);
app.use("/mao", routerMao);
app.use("/jogo", routerJogo);
app.use("/rodada", routerRodada);
app.use("/participante", routerParticipante);
app.use("/movimentacao", routerMovimentacao);
app.use("/equipe", routerEquipe);

app.listen(5000, function () {
    console.log("servidor web em funcionamento!");
})  