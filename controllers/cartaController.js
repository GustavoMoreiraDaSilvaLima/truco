import Adaptors from "../adaptors/Adaptors.js";
import Database from "../db/database.js";
import cartaRepository from "../repositories/cartaRepository.js";
import maoRepository from "../repositories/maoRepository.js";
import participanteRepository from "../repositories/participanteRepository.js";
export default class CartaController {
    async PegarCarta(req, res) {
        const Banco = new Database();
        Banco.AbreTransacao();
        try {
            const { sala, usuario, jogo } = req.params;
            if (sala && usuario && jogo) {
                //Pegar o ID do participante e validar a sala já, 2 coelhos em uma matada só, não esquecer de enviar ao Front-end e colocar no useRef()
                const participanteRepo = new participanteRepository(Banco);
                let participante = await participanteRepo.obterParticipanteSala(usuario, sala);
                if (participante) {
                    //Pegar o ID do baralho
                    const maoRepo = new maoRepository(Banco);
                    let Baralho = await maoRepo.obterBaralho(sala, jogo);
                    if (Baralho) {
                        //Com o ID do baralho vamos pegar as cartas
                        const Adaptor = new Adaptors();
                        const cartas = await Adaptor.PegarCartas(Baralho.maoCodigoBaralho);
                        if (cartas) {
                            const cartasRepo = new cartaRepository(Banco);
                            for (let i = 0; i < cartas.cards.length; i++) {
                                let result = await cartasRepo.GravarCarta(cartas.cards[i], participante.parId, Baralho.maoId);
                                if (!result) {
                                    throw new Error("Erro ao gravar carta");
                                }
                            }
                            let cartaVira = null;
                            let ViraRecebido = false;
                            //Verificar se a quantidade total de cartas já foi ultrapassada
                            if (cartas.remaining <= 28) {
                                //Lógica para pegar o vira e lançar na frente
                                cartaVira = await Adaptor.PegarCartasVira(Baralho.maoCodigoBaralho);
                                if (cartaVira) {
                                    ViraRecebido = true
                                    await cartasRepo.GravarVira(cartaVira.cards[0].code, jogo, Baralho.maoId);
                                }

                            }
                            //Tudo feito?
                            Banco.Commit();
                            return res.status(201).json({ msg: "Cartas pegadas com sucesso", cartas: cartas.cards, participante: participante.parId, cartaVira: cartaVira? cartaVira.cards[0]: null, cartaViraRecebida: ViraRecebido });
                        }
                    }
                }
            }
            Banco.Rollback();
            return res.status(400).json({ msg: "Dados inválidos" });
        } catch (ex) {
            Banco.Rollback();
            return res.status(500).json({ erro: ex.message });
        }
    }
}