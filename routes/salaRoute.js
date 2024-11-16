import express from 'express'
import SalaController from '../controllers/salaController.js';

const router = express.Router();

let ctrl = new SalaController();

router.get("/", (req, res) => {
    // #swagger.tags = ['Sala']
    // #swagger.summary = 'Endpoint para retornar todos os salas'
    ctrl.listar(req, res);
});
router.post("/", (req, res) => [
    //#swagger.tags = ['Sala']
    //#swagger.summary = 'Cadastra um sala'
    /*  #swagger.requestBody = {
            required: true,
            content: {
                "application/json": {
                    schema: {
                        $ref: "#/components/schemas/salaModel"
                    }  
                }
            }
        } 
    */
    ctrl.gravar(req, res)
]);
router.delete("/:id", (req, res) => {
    //#swagger.tags = ['Sala']
    //#swagger.summary = 'Deletar um sala'
    ctrl.deletar(req, res);
});
router.get("/:id", (req, res) => {
    //#swagger.tags = ['Sala']
    //#swagger.summary = 'Retorna um sala baseado em um código'
    ctrl.obter(req, res);
});
router.put("/", (req, res) => {
    //#swagger.tags = ['Sala']
    //#swagger.summary = 'Altera um sala'
     /*  #swagger.requestBody = {
            required: true,
            content: {
                "application/json": {
                    schema: {
                        $ref: "#/components/schemas/salaModel"
                    }  
                }
            }
        } 
    */
    ctrl.alterar(req, res);
});
router.patch("/", (req, res) => {
    //#swagger.tags = ['Sala']
    //#swagger.summary = 'Realiza a alteração parcial do sala'
     /*  #swagger.requestBody = {
            required: true,
            content: {
                "application/json": {
                    schema: {
                        $ref: "#/components/schemas/salaModel"
                    }  
                }
            }
        } 
    */
    ctrl.alterarParcialmente(req, res);
});

export default router;