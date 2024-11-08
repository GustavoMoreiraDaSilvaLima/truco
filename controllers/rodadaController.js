import equipeEntity from '../entities/equipeEntity.js';
import maoEntity from '../entities/maoEntity.js';
import rodadaEntity from '../entities/rodadaEntity.js';
import rodadaRepository from '../repositories/rodadaRepository.js';

export default class RodadaController {

    async listar(req, res) {
        try {
            let rodada = new rodadaRepository();
            let lista = await rodada.listar();
            res.status(200).json(lista);
        } catch (ex) {
            res.status(500).json({ erro: ex.message });
        }
    }

    async obter(req, res) {
        try {
            let id = req.params.id;
            let rodada = new rodadaRepository();
            let entidade = await rodada.obter(id);
            if (entidade) {
                res.status(200).json(entidade);
            } else {
                res.status(404).json({ erro: "rodada não encontrada" });
            }
        } catch (ex) {
            res.status(500).json({ erro: ex.message });
        }
    }

    async gravar(req, res) {
        try {
            let { mao, equipe } = req.body;
            if (mao && mao.maoId > 0 && equipe && equipe.eqpId > 0) {
                let entidade = new rodadaEntity(0, new maoEntity(mao.maoId), new equipeEntity(equipe.eqpId));

                let repo = new rodadaRepository();
                let result = await repo.gravar(entidade);
                if (result) {
                    res.status(201).json({ msg: "rodada criada com sucesso" });
                } else {
                    throw new Error({ msg: "Erro ao criar rodada" });
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
            let { rodId, mao, equipe } = req.body;
            if (rodId && mao && mao.maoId > 0 && equipe && equipe.eqpId > 0) {
                let entidade = new rodadaEntity(rodId, new maoEntity(mao.maoId), new equipeEntity(equipe.eqpId));
                let repo = new rodadaRepository();
                if (await repo.obter(rodId)) {
                    let result = await repo.alterar(entidade);

                    if (result) {
                        res.status(200).json({ msg: "Alteração feita com sucesso!" });
                    } else {
                        throw new Error({ msg: "Erro ao alterar rodada" });
                    }
                } else {
                    res.status(404).json({ msg: "rodada não encontrada para alteração" });
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
            let { rodId, mao, equipe } = req.body;

            if (rodId && ((mao && mao.maoId > 0) || (equipe && equipe.eqpId > 0))) {
                let rodadaEntidade = new rodadaEntity(rodId, new maoEntity(mao.maoId), new equipeEntity(equipe.eqpId));

                if (mao && mao.maoId > 0) {
                    rodadaEntidade.mao = new maoEntity(mao.maoId);
                }
                if (equipe && equipe.eqpId > 0) {
                    rodadaEntidade.equipe = new equipeEntity(equipe.eqpId);
                }

                let rodadaRepo = new rodadaRepository();
                let result = await rodadaRepo.alterarParcialmente(rodadaEntidade);

                if (result == false) {
                    throw new Error("Erro ao alterar rodada no banco de dados");
                }

                res.status(200).json({ msg: "Alteração parcial realizada com sucesso" })
            }
        } catch (ex) {
            res.status(500).json({ erro: ex.message });
        }
    }

    async deletar(req, res) {
        try {
            let { id } = req.params.id;
            let rodada = new rodadaRepository();
            if (await rodada.obter(id)) {
                let result = await rodada.delete(id);
                if (result) {
                    res.status(200).json(result);
                } else {
                    throw new Error({ msg: "rodada não encontrada para exclusão" });
                };
            } else {
                res.status(404).json({ msg: "rodada não encontrada para exclusão" });
            }
        } catch (ex) {
            res.status(500).json({ msg: ex.message });
        }
    }
}