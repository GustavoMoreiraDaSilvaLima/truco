import express from 'express';
import jogoController from '../controllers/jogoController.js';

const router = express.Router();
const controller = new jogoController();

router.get('/', (req, res) => {
    // #swagger.tags = ['Jogo']
    // #swagger.summary = 'Endpoint para retornar todos os jogos'
    controller.listar(req, res);
});

router.get('/:id', (req, res) => {
    // #swagger.tags = ['Jogo']
    // #swagger.summary = 'Retorna um jogo baseado em um código'
    controller.obter(req, res);
});

router.post('/', (req, res) => {
    // #swagger.tags = ['Jogo']
    // #swagger.summary = 'Cadastra um jogo'
    controller.criar(req, res);
});

router.put('/', (req, res) => {
    // #swagger.tags = ['Jogo']
    // #swagger.summary = 'Altera um jogo'
    controller.alterar(req, res);
});

router.delete('/:id', (req, res) => {
    // #swagger.tags = ['Jogo']
    // #swagger.summary = 'Deletar um jogo'
    controller.deletar(req, res);
});

export default router;