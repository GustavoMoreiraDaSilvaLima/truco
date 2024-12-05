import EquipeEntity from "../entities/equipeEntity.js";
import EquipeRepository from "../repositories/equipeRepository.js";
import participanteRepository from "../repositories/participanteRepository.js";
export default class EquipeController {

    async listar(req, res) {
        try {
            let equipe = new EquipeRepository();
            let lista = await equipe.listar();
            res.status(200).json(lista);
        }
        catch (ex) {
            res.status(500).json({ msg: ex.message });
        }
    }

    async obter(req, res) {
        try {
            let { id } = req.params;
            let equipe = new EquipeRepository();
            let entidade = await equipe.obter(id);
            if (entidade) {
                res.status(200).json(entidade)
            }
            else {
                res.status(404).json({ msg: "Equipe não encontrado!" });
            }
        }
        catch (ex) {
            res.status(500).json({ msg: ex.message });
        }
    }

    async obterEquipeSala(req, res) {
        try {

            let { id } = req.params;
            let participante = new participanteRepository();
            let entidade = await participante.obterEquipeSala(id);
            if (entidade) {
                res.status(200).json(entidade);
            } else {
                res.status(404).json({ msg: "Equipe não encontrado pelo id da sala!" });
            }
        } catch (ex) {
            res.status(500).json({ msg: ex.message });
        }
    }

    async gravar(req, res) {
        try {
            let { descricao } = req.body;
            if (descricao) {

                let entidade = new EquipeEntity(0, descricao);

                let repo = new EquipeRepository();
                let result = await repo.gravar(entidade);

                if (result)
                    res.status(201).json({ msg: "Equipe gravado com sucesso!" });
                else
                    throw new Error("Erro ao inserir o Equipe no banco de dados");
            }
            else {
                res.status(400).json({ msg: "Parâmetros não informados corretamente!" });
            }
        }
        catch (ex) {
            res.status(500).json({ msg: ex.message });
        }
    }

    async alterarParcialmente(req, res) {
        try {
            let { id, descricao } = req.body;
            if (id && descricao) {

                let equipeEntidade = new EquipeEntity(id, descricao);

                let equipeRepo = new EquipeRepository();
                let result = await equipeRepo.alterarParcialmente(equipeEntidade);

                if (result == false)
                    throw new Error("Erro ao executar a atualização no banco de dados")

                res.status(200).json({ msg: "Alteração parcial realizada com sucesso!" });
            }
        }
        catch (ex) {
            res.status(500).json({ msg: ex.message });
        }
    }

    async alterar(req, res) {
        try {
            let { id, descricao } = req.body;
            if (id && descricao) {

                let entidade = new EquipeEntity(id, descricao);
                let repo = new EquipeRepository();
                if (await repo.obter(id)) {
                    let result = await repo.alterar(entidade);

                    if (result) {
                        res.status(200).json({ msg: "Alteração realizada com sucesso!" });
                    }
                    else
                        throw new Error("Erro ao executar o comando update!");
                }
                else {
                    res.status(404).json({ msg: "Equipe não encontrado para alteração" });
                }
            }
            else {
                res.status(400).json({ msg: "Informe os parâmetros corretamente!" });
            }
        }
        catch (ex) {
            res.status(500).json({ msg: ex.message });
        }
    }

    async deletar(req, res) {
        try {
            let { id } = req.params;
            let repo = new EquipeRepository();
            if (await repo.obter(id)) {
                let result = await repo.deletar(id);

                if (result)
                    res.status(200).json({ msg: "Equipe deletado!" });
                else
                    throw new Error("Erro ao executar o comando de deleção");
            }
            else {
                res.status(404).json({ msg: "Equipe não encontrado para a deleção!" })
            }
        }
        catch (ex) {
            res.status(500).json({ msg: ex.message });
        }
    }
}