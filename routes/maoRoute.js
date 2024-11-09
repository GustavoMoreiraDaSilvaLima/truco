import express from 'express';
import maoController from '../controllers/maoController.js';

const router = express.Router();
const controller = new maoController();

router.get('/', (req, res) => {
    // #swagger.tags = ['Mão']
    // #swagger.summary = 'Endpoint para retornar todas as mãos'
    controller.listar(req, res);
});
router.get('/:id', (req, res) => {
    // #swagger.tags = ['Mão']
    // #swagger.summary = 'Retorna uma mão baseado em um código'
    controller.obter(req, res);
});
router.post('/', (req, res) => {
    // #swagger.tags = ['Mão']
    // #swagger.summary = 'Cadastra uma mão'
    controller.gravar(req, res);
});
router.put('/', (req, res) => {
    // #swagger.tags = ['Mão']
    // #swagger.summary = 'Altera uma mão'
    controller.alterar(req, res);
});
router.delete('/:id', (req, res) => {
    // #swagger.tags = ['Mão']
    // #swagger.summary = 'Deletar uma mão'
    controller.deletar(req, res);
});

export default router;