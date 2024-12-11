import Adaptors from "../adaptors/Adaptors.js";
import Database from "../db/database.js";
import JogoEntity from "../entities/jogoEntity.js";
import jogoRepository from "../repositories/jogoRepository.js";
import maoRepository from "../repositories/maoRepository.js";
import movimentacaoRepository from "../repositories/movimentacaoRepository.js";
import participanteRepository from "../repositories/participanteRepository.js";
import rodadaRepository from "../repositories/rodadaRepository.js";

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

    async IniciarJogo(Sala, usuario) {
        const Banco = new Database();
        Banco.AbreTransacao()
        try {
            const jogoRepo = new jogoRepository(Banco);
            let jogo = await jogoRepo.JogoIniciar(Sala);
            if (jogo) {
                //Jogo valido temos que criar o Baralho
                const baralhoAdaptor = new Adaptors();
                const baralho = await baralhoAdaptor.CriarBaralho();
                if (baralho) {
                    //Vamos gravar o baralho no banco agora, o primeiro! A primeira Mao do jogo
                    const baralhoRepo = new maoRepository(Banco);
                    let mao = await baralhoRepo.GravarBaralho(baralho.deck_id, jogo);
                    if (mao > 0) {
                        //Se mao for valido, gravamos a rodada
                        let rodadaRepo = new rodadaRepository();
                        let Rodada = await rodadaRepo.GravarRodada(mao);
                        if (Rodada) {
                            const participanteRepo = new participanteRepository(Banco);
                            //tenho mao, rodada e jogo mas quero os participantes deste jogo, tenho a sala
                            const participante = await participanteRepo.obterParticipanteSalaPorJogoESala(jogo, Sala);
                            if (participante) {
                                //Agora eu crio a movimentação!

                                if (await this.IniciarNovaMovimentacao(participante, Rodada, Banco)) {
                                    Banco.Commit();
                                    return { status: 201, idJogo: jogo, rodada: Rodada, mao: mao };
                                }else{
                                    throw new Error("Erro desconhecido ao iniciar a mão");
                                }
                            }
                        }
                    }
                }
            }
            throw new Error("Erro ao iniciar jogo");
        } catch (ex) {
            Banco.Rollback();
            console.log(ex);
            return { status: 500 }
        }
    }

    async IniciarNovaMao(Jogo) {

    }

    async IniciarNovaRodada(Mao) {

    }

    //Participante IsArray
    async IniciarNovaMovimentacao(Participante, Rodada, Banco) {
        const movimentacaoRepo = new movimentacaoRepository(Banco);
        let ordem = 1;
        const FiltroEquipe1 = Participante.filter(part => part.equipe.eqpId % 2 == 0);
        const FiltroEquipe2 = Participante.filter(part => part.equipe.eqpId % 2 == 1);
        let l = 0;
        for (let i = 0; i < FiltroEquipe1.length; i++) {
            await movimentacaoRepo.InserirMovimentoParticipante(FiltroEquipe1[i].parId, ordem, Rodada);
            ordem++
            await movimentacaoRepo.InserirMovimentoParticipante(FiltroEquipe2[l].parId, ordem, Rodada);
            ordem++
            l++;
        }
        if (ordem == 5)
            return true;
        else {
            return false;
        }
    }

    async FinalizarJogo(Sala) {
        const Banco = new Database();
        Banco.AbreTransacao()
        try {
            const jogoRepo = new jogoRepository(Banco);
            let jogo = jogoRepo.JogoFinalizar(Sala);
            if (jogo) {
                Banco.Commit()
                return { status: 200 };
            }
            throw new Error("Erro ao finalizar jogo");
        } catch (ex) {
            Banco.Rollback();
            console.log(ex);
            return { status: 500 }
        }
    }

    async JogarCarta(req, res) {
        const Banco = new Database();
        Banco.AbreTransacao();
        try {
            const { carta, jogo, participante, rodada } = req.body;


        } catch {


        }

    }


    //equipe: equipeUser, sala: Sala, usuario: usuario, rodada: rodada
    async PrimeiraJogada(objeto) {
        const Banco = new Database();
        Banco.AbreTransacao();
        try {
            const { equipe, sala, usuario, rodada, jogo } = objeto;
            //jogo
            const jogoRepo = new jogoRepository(Banco);
            let jogoId = await jogoRepo.obter(jogo);
            if (jogoId) {
                //mao
                let mao = await jogoRepo.obterUmaMao(jogoId);
                if (mao) {
                    //se a mao for valida faço um outro select mas na tb_movimentacao com a rodada e a mao, caso não de resultado então ele participa primeiro, é o primeiro a jogar! se ele for o primeiro a jogar vai ser inserido na tb_movimentacao mas sem a mov ordem preenchida
                    const movimentacaoRepo = new movimentacaoRepository(Banco);
                    let result = movimentacaoRepo.tentarSelecionarMovimento(mao, rodada);
                    if (!result) {
                        //Insiro uma movimentação no id desse usuario

                    }
                }
            }
            //mao

            //rodada

        } catch {
            Banco.Rollback();
            return { status: 500 };
        }
    }
}