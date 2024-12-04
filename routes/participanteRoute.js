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
        /*  #swagger.requestBody = {
            required: true,
            content: {
                "application/json": {
                    schema: {
                        $ref: "#/components/schemas/participanteModel"
                    }  
                }
            }
        } 
    */
    ctrl.gravar(req, res);
});

router.put('/', (req, res) => {
    // #swagger.tags = ['participante']
    // #swagger.summary = 'Altera um participante'
            /*  #swagger.requestBody = {
            required: true,
            content: {
                "application/json": {
                    schema: {
                        $ref: "#/components/schemas/participanteModel"
                    }  
                }
            }
        } 
    */
    ctrl.alterar(req, res);
});

router.patch("/", (req, res) => {
    //#swagger.tags = ['participante']
    //#swagger.summary = 'Realiza a alteração parcial do participante'
            /*  #swagger.requestBody = {
            required: true,
            content: {
                "application/json": {
                    schema: {
                        $ref: "#/components/schemas/participanteModel"
                    }  
                }
            }
        } 
    */
    ctrl.alterarParcialmente(req, res);
});

router.delete('/:id', (req, res) => {
    // #swagger.tags = ['participante']
    // #swagger.summary = 'Deletar um participante'
    ctrl.deletar(req, res);
});

export default router;