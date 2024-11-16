import express from 'express';
import movimentacaoController from '../controllers/movimentacaoController.js';

const router = express.Router();
let ctrl = new movimentacaoController();

router.get('/', (req, res) => {
    // #swagger.tags = ['Movimentacao']
    // #swagger.summary = 'Endpoint para retornar todos os movimentações'
    ctrl.listar(req, res);
});

router.get('/:id', (req, res) => {
    // #swagger.tags = ['Movimentacao']
    // #swagger.summary = 'Retorna um movimentacao baseado em um código'
    ctrl.obter(req, res);
});

router.post('/', (req, res) => {
    // #swagger.tags = ['Movimentacao']
    // #swagger.summary = 'Cadastra um movimentacao'
    ctrl.criar(req, res);
});

router.put('/', (req, res) => {
    // #swagger.tags = ['Movimentacao']
    // #swagger.summary = 'Altera um movimentacao'
    ctrl.alterar(req, res);
});

router.delete('/:id', (req, res) => {
    // #swagger.tags = ['Movimentacao']
    // #swagger.summary = 'Deletar um movimentacao'
    ctrl.deletar(req, res);
});

export default router;