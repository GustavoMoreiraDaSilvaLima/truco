import express from 'express';
import rodadaController from '../controllers/rodadaController.js';

const router = express.Router();
let ctrl = new rodadaController();

router.get('/', (req, res) => {
    // #swagger.tags = ['Rodada']
    // #swagger.summary = 'Endpoint para retornar todos os rodadas'
    ctrl.listar(req, res);
});

router.get('/:id', (req, res) => {
    // #swagger.tags = ['Rodada']
    // #swagger.summary = 'Retorna um rodada baseado em um código'
    ctrl.obter(req, res);
});

router.post('/', (req, res) => {
    // #swagger.tags = ['Rodada']
    // #swagger.summary = 'Cadastra um rodada'
    ctrl.criar(req, res);
});

router.put('/', (req, res) => {
    // #swagger.tags = ['Rodada']
    // #swagger.summary = 'Altera um rodada'
    ctrl.alterar(req, res);
});

router.delete('/:id', (req, res) => {
    // #swagger.tags = ['Rodada']
    // #swagger.summary = 'Deletar um rodada'
    ctrl.deletar(req, res);
});

export default router;