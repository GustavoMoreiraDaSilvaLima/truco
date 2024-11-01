import UsuarioEntity from "../entities/usuarioEntity.js";
import UsuarioRepository from "../repositories/usuarioRepository.js";
export default class UsuarioController {

    async listar(req, res) {
        try {
            let usuario = new UsuarioRepository();
            let lista = await usuario.listar();
            res.status(200).json(lista);
        }
        catch (ex) {
            res.status(500).json({ msg: ex.message });
        }
    }

    async obter(req, res) {
        try {
            let { id } = req.params;
            let usuario = new UsuarioRepository();
            let entidade = await usuario.obter(id);
            if (entidade) {
                res.status(200).json(entidade)
            }
            else {
                res.status(404).json({ msg: "Usuário não encontrado!" });
            }
        }
        catch (ex) {
            res.status(500).json({ msg: ex.message });
        }
    }

    async alterarParcialmente(req, res) {
        try {
            let { id, nome, email, senha } = req.body;
            if (id && (nome || email || senha)) {

                let usuarioEntidade = new UsuarioEntity(id, email, nome, senha);

                let usuarioRepo = new UsuarioRepository();
                let result = await usuarioRepo.alteracaoParcial(usuarioEntidade);

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
            let { id, nome, email, senha } = req.body;
            if (id && nome && email && senha) {

                let entidade = new UsuarioEntity(id, email, nome, senha);
                let repo = new UsuarioRepository();
                if (await repo.obter(id)) {
                    let result = await repo.alterar(entidade);

                    if (result) {
                        res.status(200).json({ msg: "Alteração realizada com sucesso!" });
                    }
                    else
                        throw new Error("Erro ao executar o comando update!");
                }
                else {
                    res.status(404).json({ msg: "Usuário não encontrado para alteração" });
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
            let repo = new UsuarioRepository();
            if (await repo.obter(id)) {
                let result = await repo.deletar(id);

                if (result)
                    res.status(200).json({ msg: "Usuário deletado!" });
                else
                    throw new Error("Erro ao executar o comando de deleção");
            }
            else {
                res.status(404).json({ msg: "Usuário não encontrado para a deleção!" })
            }
        }
        catch (ex) {
            res.status(500).json({ msg: ex.message });
        }
    }

    async gravar(req, res) {

        try {
            let { nome, email, senha } = req.body;
            if (nome && email && senha) {

                let entidade = new UsuarioEntity(0, email, nome, senha);

                let repo = new UsuarioRepository();
                let result = await repo.gravar(entidade);

                if (result)
                    res.status(201).json({ msg: "Usuário gravado com sucesso!" });
                else
                    throw new Error("Erro ao inserir o usuário no banco de dados");
            }
            else {
                res.status(400).json({ msg: "Parâmetros não informados corretamente!" });
            }
        }
        catch (ex) {
            res.status(500).json({ msg: ex.message });
        }
    }

}