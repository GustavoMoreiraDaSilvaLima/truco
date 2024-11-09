import JogoEntity from "../entities/jogoEntity.js";
import jogoRepository from "../repositories/jogoRepository.js";

export default class JogoController {
    async listar(req, res) {
        try {
            let repository = new jogoRepository();
            let result = await repository.listar();
            if (result) {
                res.status(200).json(result);
            } else {
                res.status(404).json({ message: "Nenhum jogo encontrado" });
            }
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    }

    async obter(req, res) {
        try {
            let { id } = req.params;
            if (id && id > 0) {
                let repository = new jogoRepository();
                let result = await repository.obter(id);
                if (result) {
                    res.status(200).json(result);
                } else {
                    res.status(404).json({ message: "Jogo não encontrado" });
                }
            } else {
                res.status(400).json({ message: "Id não informado" });
            }
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    }

    async criar(req, res) {
        try {
            let { jogDtinicio, jogDtfim, sala } = req.body;
            if (jogDtinicio && jogDtfim && sala) {
                let entity = new JogoEntity(0, jogDtinicio, jogDtfim, sala);
                let repository = new jogoRepository();
                let result = await repository.gravar(entity);
                if (result) {
                    res.status(201).json({ message: "Jogo criado com sucesso" });
                } else {
                    res.status(400).json({ message: "Erro ao criar jogo" });
                }
            } else {
                res.status(400).json({ message: "Dados obrigatórios não informados" });
            }
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    }

    async alterar(req, res) {
        try {
            let { jogId, jogDtinicio, jogDtfim, sala } = req.body;
            if (jogId && jogDtinicio && jogDtfim && sala) {
                let entity = new JogoEntity(jogId, jogDtinicio, jogDtfim, sala);
                let repository = new jogoRepository();
                let result = await repository.alterar(entity);
                if (result) {
                    res.status(200).json({ message: "Jogo alterado com sucesso" });
                } else {
                    res.status(400).json({ message: "Erro ao alterar jogo" });
                }
            } else {
                res.status(400).json({ message: "Dados obrigatórios não informados" });
            }
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    }

    async deletar(req, res) {
        try {
            let { id } = req.params;
            if (id && id > 0) {
                let repository = new jogoRepository();
                let result = await repository.delete(id);
                if (result) {
                    res.status(200).json({ message: "Jogo deletado com sucesso" });
                } else {
                    res.status(400).json({ message: "Erro ao deletar jogo" });
                }
            } else {
                res.status(400).json({ message: "Id não informado" });
            }
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    }
}