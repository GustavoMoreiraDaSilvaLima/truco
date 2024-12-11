import express from 'express';
import jogoController from '../controllers/jogoController.js';

const router = express.Router();
let ctrl = new jogoController();

router.get('/', (req, res) => {
    // #swagger.tags = ['Jogo']
    // #swagger.summary = 'Endpoint para retornar todos os jogos'
    ctrl.listar(req, res);
});

router.get('/:id', (req, res) => {
    // #swagger.tags = ['Jogo']
    // #swagger.summary = 'Retorna um jogo baseado em um código'
    ctrl.obter(req, res);
});

router.post('/', (req, res) => {
    // #swagger.tags = ['Jogo']
    // #swagger.summary = 'Cadastra um jogo'
    ctrl.criar(req, res);
});

router.post('/sala/rodada', (req, res) => {
    // #swagger.tags = ['Jogo']
    // #swagger.summary = 'Cadastra um jogo'
    ctrl.JogarCarta(req, res);
})

router.put('/', (req, res) => {
    // #swagger.tags = ['Jogo']
    // #swagger.summary = 'Altera um jogo'
    ctrl.alterar(req, res);
});

router.delete('/:id', (req, res) => {
    // #swagger.tags = ['Jogo']
    // #swagger.summary = 'Deletar um jogo'
    ctrl.deletar(req, res);
});

export default router;