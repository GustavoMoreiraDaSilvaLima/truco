import express from 'express';
import participanteController from '../controllers/participanteController.js';

const router = express.Router();
let ctrl = new participanteController();

router.get('/', (req, res) => {
    // #swagger.tags = ['participante']
    // #swagger.summary = 'Endpoint para retornar todos os participantes'
    ctrl.listar(req, res);
});

router.get('/:id', (req, res) => {
    // #swagger.tags = ['participante']
    // #swagger.summary = 'Retorna um participante baseado em um código'
    ctrl.obter(req, res);
});

router.post('/', (req, res) => {
    // #swagger.tags = ['participante']
    // #swagger.summary = 'Cadastra um participante'
    ctrl.gravar(req, res);
});

router.put('/', (req, res) => {
    // #swagger.tags = ['participante']
    // #swagger.summary = 'Altera um participante'
    ctrl.alterar(req, res);
});

router.delete('/:id', (req, res) => {
    // #swagger.tags = ['participante']
    // #swagger.summary = 'Deletar um participante'
    ctrl.deletar(req, res);
});

export default router;