import usuarioEntity from '../entities/usuarioEntity.js';
import salaEntity from '../entities/salaEntity.js';
import salaRepository from '../repositories/salaRepository.js';

export default class SalaController {

    async listar(req, res) {
        try {
            let sala = new salaRepository();
            let lista = await sala.listar();
            res.status(200).json(lista);
        } catch (ex) {
            res.status(500).json({ erro: ex.message });
        }
    }

    async obter(req, res) {
        try {
            let id = req.params.id;
            let sala = new salaRepository();
            let entidade = await sala.obter(id);
            if (entidade) {
                res.status(200).json(entidade);
            } else {
                res.status(404).json({ erro: "Sala não encontrada" });
            }
        } catch (ex) {
            res.status(500).json({ erro: ex.message });
        }
    }

    async gravar(req, res) {
        try {
            let { nome, usuario } = req.body;
            if (nome && usuario && usuario.id > 0) {
                let entidade = new salaEntity(0, nome, new usuarioEntity(usuario.id));

                let repo = new salaRepository();
                let result = await repo.gravar(entidade);
                if (result) {
                    res.status(201).json({ msg: "Sala criada com sucesso" });
                } else {
                    throw new Error({ msg: "Erro ao criar sala" });
                }
            } else {
                res.status(400).json({ msg: "Dados inválidos" });
            }

        } catch (ex) {
            res.status(500).json({ erro: ex.message });
        }
    }

    async alterar(req, res) {
        try {
            let { id, nome, usuario } = req.body;
            if (id && nome && usuario && usuario.id > 0) {
                let entidade = new salaEntity(id, nome, new usuarioEntity(usuario.id));
                let repo = new salaRepository();
                if (await repo.obter(id)) {
                    let result = await repo.alterar(entidade);

                    if (result) {
                        res.status(200).json({ msg: "Alteração feita com sucesso!" });
                    } else {
                        throw new Error({ msg: "Erro ao alterar sala" });
                    }
                } else {
                    res.status(404).json({ msg: "Sala não encontrada para alteração" });
                }

            } else {
                res.status(400).json({ msg: "Dados inválidos" });
            }
        } catch (ex) {
            res.status(500).json({ erro: ex.message });
        }
    }

    async alterarParcialmente(req, res) {
        try {
            let { id, nome, usuario } = req.body;

            if (id && (nome || (usuario && usuario.id > 0))) {
                let salaEntidade = new salaEntity(id, nome);

                if (usuario && usuario.id > 0) {
                    salaEntidade.usuario = new usuarioEntity(usuario.id);
                }

                let salaRepo = new salaRepository();
                let result = await salaRepo.alterarParcialmente(salaEntidade);

                if (result == false) {
                    throw new Error("Erro ao alterar sala no banco de dados");
                }

                res.status(200).json({ msg: "Alteração parcial realizada com sucesso" })
            }
        } catch (ex) {
            res.status(500).json({ erro: ex.message });
        }
    }

    async deletar(req, res) {
        try {
            let { id } = req.params;
            let sala =  new salaRepository();
            if (await sala.obter(id)) {
                let result = await sala.delete(id);
                if (result) {
                    res.status(200).json({ msg: "Sala deletada!" });
                } else {
                    throw new Error({ msg: "Sala não encontrada para exclusão" });
                };
            } else {
                res.status(404).json({ msg: "Sala não encontrada para exclusão" });
            }
        } catch (ex) {
            res.status(500).json({ msg: ex.message });
        }
    }
}