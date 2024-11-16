import express from 'express'
import EquipeController from '../controllers/equipeController.js';
import authMiddleware from '../middlewares/authMidleware.js';

const router = express.Router();

const auth = new authMiddleware();
let ctrl = new EquipeController();

router.get("/", (req, res) => {
    // #swagger.tags = ['Equipe']
    // #swagger.summary = 'Endpoint para retornar todos os equipes'
    ctrl.listar(req, res);
});

router.post("/", (req, res) => [
    //#swagger.tags = ['Equipe']
    //#swagger.summary = 'Cadastra um equipe'
    ctrl.gravar(req, res)
]);

router.delete("/:id", (req, res) => {
    //#swagger.tags = ['Equipe']
    //#swagger.summary = 'Deletar um equipe'
    ctrl.deletar(req, res);
});

router.get("/:id", (req, res) => {
    //#swagger.tags = ['Equipe']
    //#swagger.summary = 'Retorna um equipe baseado em um código'
    ctrl.obter(req, res);
});

router.put("/", (req, res) => {
    //#swagger.tags = ['Equipe']
    //#swagger.summary = 'Altera um equipe'
    ctrl.alterar(req, res);
});

router.patch("/", (req, res) => {
    //#swagger.tags = ['Equipe']
    //#swagger.summary = 'Realiza a alteração parcial do equipe'
    ctrl.alterarParcialmente(req, res);
});

export default router;