import maoEntity from "../entities/maoEntity.js";
import maoRepository from "../repositories/maoRepository.js";

export default class MaoController {
    async listar(req, res) {
        try {
            let repository = new maoRepository();
            let result = await repository.listar();
            res.status(200).json(result);
        } catch (err) {
            res.status(500).json({ erro: err.message });
        }
    }

    async obter(req, res) {
        try {
            let { id } = req.params;
            if (id && id > 0) {
                let repository = new maoRepository();
                let result = await repository.obter(id);
                if (result) {
                    res.status(200).json(result);
                } else {
                    res.status(404).json({ erro: "Mão não encontrada" });
                }
            } else {
                res.status(400).json({ erro: "Informe o id da mão" });
            }
        } catch (err) {
            res.status(500).json({ erro: err.message });
        }
    }

    async gravar(req, res) {
        try {
            let { maoOrdem, maoCodigoBaralho, maoTrucada, maoValor, jogoId, equipeId } = req.body;
            if (maoOrdem && maoCodigoBaralho && maoTrucada && maoValor && jogoId && equipeId) {
                let entity = new maoEntity(0, maoOrdem, maoCodigoBaralho, maoTrucada, maoValor, jogoId, equipeId);
                let repository = new maoRepository();
                let result = await repository.gravar(entity);
                res.status(201).json(result);
            } else {
                res.status(400).json({ erro: "Informe todos os campos" });
            }
        } catch (err) {
            res.status(500).json({ erro: err.message });
        }
    }

    async alterar(req, res) {
        try {
            let { id, maoOrdem, maoCodigoBaralho, maoTrucada, maoValor, jogoId, equipeId } = req.body;
            if (maoOrdem && maoCodigoBaralho && maoTrucada && maoValor && jogoId && equipeId && id && id > 0) {
                let entity = new maoEntity(id, maoOrdem, maoCodigoBaralho, maoTrucada, maoValor, jogoId, equipeId);
                let repository = new maoRepository();
                let result = await repository.alterar(entity);
                if (result) {
                    res.status(200).json(result);
                } else {
                    res.status(404).json({ erro: "Mão não encontrada" });
                }
            } else {
                res.status(400).json({ erro: "Informe todos os campos" });
            }
        } catch (err) {
            res.status(500).json({ erro: err.message });
        }
    }

    async excluir(req, res) {
        try {
            let { id } = req.params;
            if (id && id > 0) {
                let repository = new maoRepository();
                let result = await repository.excluir(id);
                if (result) {
                    res.status(200).json(result);
                } else {
                    res.status(404).json({ erro: "Mão não encontrada" });
                }
            } else {
                res.status(400).json({ erro: "Informe o id da mão" });
            }
        } catch (err) {
            res.status(500).json({ erro: err.message });
        }
    }

}