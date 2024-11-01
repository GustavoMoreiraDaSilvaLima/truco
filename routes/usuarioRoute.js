import express from 'express'
import UsuarioController from '../controllers/usuarioController.js';

const router = express.Router();

let ctrl = new UsuarioController();

router.get("/", (req, res) => {
    // #swagger.tags = ['Usuário']
    // #swagger.summary = 'Endpoint para retornar todos os usuários'
    ctrl.listar(req, res);
});
router.post("/", (req, res) => [
    //#swagger.tags = ['Usuário']
    //#swagger.summary = 'Cadastra um usuário'
    ctrl.gravar(req, res)
]);
router.delete("/:id", (req, res) => {
    //#swagger.tags = ['Usuário']
    //#swagger.summary = 'Deletar um usuário'
    ctrl.deletar(req, res);
});
router.get("/:id", (req, res) => {
    //#swagger.tags = ['Usuário']
    //#swagger.summary = 'Retorna um usuário baseado em um código'
    ctrl.obter(req, res);
});
router.put("/", (req, res) => {
    //#swagger.tags = ['Usuário']
    //#swagger.summary = 'Altera um usuário'
    ctrl.alterar(req, res);
});
router.patch("/", (req, res) => {
    //#swagger.tags = ['Usuário']
    //#swagger.summary = 'Realiza a alteração parcial do usuário'
    ctrl.alterarParcialmente(req, res);
});

export default router;