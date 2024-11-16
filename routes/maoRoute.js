import express from 'express';
import maoController from '../controllers/maoController.js';

const router = express.Router();
let ctrl = new maoController();

router.get('/', (req, res) => {
    // #swagger.tags = ['Mão']
    // #swagger.summary = 'Endpoint para retornar todas as mãos'
    ctrl.listar(req, res);
});
router.get('/:id', (req, res) => {
    // #swagger.tags = ['Mão']
    // #swagger.summary = 'Retorna uma mão baseado em um código'
    ctrl.obter(req, res);
});
router.post('/', (req, res) => {
    // #swagger.tags = ['Mão']
    // #swagger.summary = 'Cadastra uma mão'
    ctrl.gravar(req, res);
});
router.put('/', (req, res) => {
    // #swagger.tags = ['Mão']
    // #swagger.summary = 'Altera uma mão'
    ctrl.alterar(req, res);
});
router.delete('/:id', (req, res) => {
    // #swagger.tags = ['Mão']
    // #swagger.summary = 'Deletar uma mão'
    ctrl.deletar(req, res);
});

export default router;