import cartaEntity from '../entities/cartaEntity.js';
import rodadaEntity from '../entities/rodadaEntity.js';
import participanteEntity from '../entities/participanteEntity.js';
import movimentacaoEntity from '../entities/movimentacaoEntity.js';
import movimentacaoRepository from '../repositories/movimentacaoRepository.js';

export default class MovimentacaoController {

    async listar(req, res) {
        try {
            let movimentacao = new movimentacaoRepository();
            let lista = await movimentacao.listar();
            res.status(200).json(lista);
        } catch (ex) {
            res.status(500).json({ erro: ex.message });
        }
    }

    async obter(req, res) {
        try {
            let id = req.params.id;
            let movimentacao = new movimentacaoRepository();
            let entidade = await movimentacao.obter(id);
            if (entidade) {
                res.status(200).json(entidade);
            } else {
                res.status(404).json({ erro: "movimentacao não encontrada" });
            }
        } catch (ex) {
            res.status(500).json({ erro: ex.message });
        }
    }

    async gravar(req, res) {
        try {
            let { movOrdem, movCorreu, movTrucou, carta, rodada, participante } = req.body;
            if (movOrdem && movCorreu && movTrucou && carta && carta.carId > 0 && rodada && rodada.rodId > 0 && participante && participante.parId > 0) {
                let entidade = new movimentacaoEntity(0, movOrdem, movCorreu, movTrucou, new cartaEntity(carta.carId), new rodadaEntity(rodada.rodId), new participanteEntity(participante.parId));

                let repo = new movimentacaoRepository();
                let result = await repo.gravar(entidade);
                if (result) {
                    res.status(201).json({ msg: "movimentacao criada com sucesso" });
                } else {
                    throw new Error({ msg: "Erro ao criar movimentacao" });
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
            let { movId, movOrdem, movCorreu, movTrucou, carta, rodada, participante } = req.body;
            if (movId && movOrdem && movCorreu && movTrucou && rodada && rodada && rodada.rodId > 0 && carta && carta.carId > 0 && participante && participante.parId > 0) {
                let entidade = new movimentacaoEntity(movId, movOrdem, movCorreu, movTrucou, new cartaEntity(carta.carId), new rodadaEntity(rodada.rodId), new participanteEntity(participante.parId));
                let repo = new movimentacaoRepository();
                if (await repo.obter(movId)) {
                    let result = await repo.alterar(entidade);

                    if (result) {
                        res.status(200).json({ msg: "Alteração feita com sucesso!" });
                    } else {
                        throw new Error({ msg: "Erro ao alterar movimentacao" });
                    }
                } else {
                    res.status(404).json({ msg: "movimentacao não encontrada para alteração" });
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
            let { movId, movOrdem, movCorreu, movTrucou, carta, rodada, participante } = req.body;

            if (movId && (movOrdem || movCorreu || movTrucou || (carta && carta.carId > 0) || (rodada && rodada.rodId > 0) || (participante && participante.parId > 0))) {
                let movimentacaoEntidade = new movimentacaoEntity(movId, movOrdem, movCorreu, movTrucou, new cartaEntity(carta.carId), new rodadaEntity(rodada.rodId), new participanteEntity(participante.parId));

                if (rodada && rodada.rodId > 0) {
                    movimentacaoEntidade.rodada = new rodadaEntity(rodada.rodId);
                }
                if (carta && carta.carId > 0) {
                    movimentacaoEntidade.carta = new cartaEntity(carta.carId);
                }
                if (participante && participante.parId > 0) {
                    movimentacaoEntidade.participante = new participanteEntity(participante.parId);
                }

                let movimentacaoRepo = new movimentacaoRepository();
                let result = await movimentacaoRepo.alterarParcialmente(movimentacaoEntidade);

                if (result == false) {
                    throw new Error("Erro ao alterar movimentacao no banco de dados");
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
            let movimentacao = new movimentacaoRepository();
            if (await movimentacao.obter(id)) {
                let result = await movimentacao.delete(id);
                if (result) {
                    res.status(200).json(result);
                } else {
                    throw new Error({ msg: "movimentacao não encontrada para exclusão" });
                };
            } else {
                res.status(404).json({ msg: "movimentacao não encontrada para exclusão" });
            }
        } catch (ex) {
            res.status(500).json({ msg: ex.message });
        }
    }
}