import express from 'express'
import authMiddleware from '../middlewares/authMidleware.js';
import CartaController from '../controllers/cartaController.js';

const router = express.Router();

const auth = new authMiddleware();
let ctrl = new CartaController();

router.get('/participante/sala/:sala/usuario/:usuario/jogo/:jogo', (req, res) => {
    // #swagger.tags = ['Carta']
    // #swagger.summary = 'Retorna Cartas para determinado participante'
    ctrl.PegarCarta(req, res);
});

router.get('/novas/sala/:sala/usuario/:usuario/jogo/:jogo/rodada/:rodada', (req, res) => {
    // #swagger.tags = ['Carta']
    // #swagger.summary = 'Retorna Cartas restantes para determinado participante'
    ctrl.PegarCartasNovas(req, res);
})

export default router;