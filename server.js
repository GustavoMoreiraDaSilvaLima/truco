import express from 'express';
import swaggerUi from 'swagger-ui-express'
import routerUsuarios from './routes/usuarioRoute.js';
import routerSalas from './routes/salaRoute.js';

import { createRequire } from "module";
const require = createRequire(import.meta.url);
const outputJson = require("./swagger-output.json");

const app = express();

app.use(express.json());

app.use("/docs", swaggerUi.serve, swaggerUi.setup(outputJson));

//rotas
app.use("/usuarios", routerUsuarios);
app.use("/salas", routerSalas);

app.listen(5000, function () {
    console.log("servidor web em funcionamento!");
})  