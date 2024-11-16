import express from 'express';
import swaggerUi from 'swagger-ui-express'
import routerUsuarios from './routes/usuarioRoute.js';
import routerSalas from './routes/salaRoute.js';
import routerAutenticacao from './routes/autenticacaoRoute.js';
import maoRoute from './routes/maoRoute.js';
import jogoRoute from './routes/jogoRoute.js';
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
app.use("/salas", routerSalas);
app.use("/login", routerAutenticacao);
app.use("/mao", maoRoute);
app.use("/jogo", jogoRoute);

app.listen(5000, function () {
    console.log("servidor web em funcionamento!");
})  