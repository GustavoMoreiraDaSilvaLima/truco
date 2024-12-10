import '@/public/css/mesa.css'
import { useEffect, useRef, useState } from 'react'
import ParticipanteService from '@/app/service/Participante.service';
import '@/public/css/cartas.css'
import JogoService from '../service/jogo.service';

export default function Mesa({ Sala, usuario, socket, jogo, rodada, equipeUser, participante, mao }) {

    const [OrganizarLayout, setOrganizarLayout] = useState([[], []]);
    const [cartaVira, setCartaVira] = useState(null);
    const [Cartas, setCartas] = useState([]);
    const Participante = useRef(null);
    async function pegarParticipantes() {
        const sParticipante = new ParticipanteService();
        let participantes = await sParticipante.ListarParticipantesSala(Sala);
        organizar(participantes);
    }

    //Função para reorganizar a lógica de manipulação visual do local
    function organizar(lista) {
        const equipeUsuario = lista.filter(participante => participante.usuario.usuId == usuario.usuId);

        equipeUser = equipeUsuario[0].equipe.eqpId;
        let equipe1 = lista.filter(participante => participante.equipe.eqpId == equipeUser && participante.usuario.usuId != usuario.usuId);
        let equipe2 = lista.filter(participante => participante.equipe.eqpId != equipeUser);
        setOrganizarLayout([equipe1, equipe2]);
    }

    async function pegarCartas() {
        setTimeout(async () => {
            const sParticipante = new ParticipanteService();
            let cartas = await sParticipante.PegarCartas(Sala, usuario.usuId, jogo);
            setCartas(cartas.cartas);
            Participante.current = cartas.participante;
            if (cartas.cartaViraRecebida) {
                socket.emit('ViraRecebido', { carta: cartas.cartaVira, equipe: equipeUser, sala: Sala, usuario: usuario, rodada: rodada, jogo: jogo });
            }
        }, 1000)
    }

    async function JogarCarta(carta) {
        const sJogo = new JogoService();
        let jogo = await sJogo.JogarCarta(carta, jogo, Participante.current, rodada);
        console.log(carta);
    }

    useEffect(() => {
        pegarParticipantes();
        pegarCartas();
        socket.on('ViraDaRodada', (carta) => {
            setCartaVira(carta);
        })

    }, [])

    return (<div className='body'>
        <div className="mesa">
            <div className="mesa-centro">
                <img src='https://deckofcardsapi.com/static/img/back.png' height={125} width={100}></img>
                {cartaVira ?
                    (<>
                        <img src={cartaVira.carta.image} height={125} width={100}></img>
                    </>) :
                    (<>
                    </>)}
            </div>
        </div>
        {OrganizarLayout[0].length == 1 && OrganizarLayout[1].length == 2 ? (
            <>
                <div className="jogador top">{OrganizarLayout[0][0].usuario.usuNome}</div>
                <div className="jogador left">{OrganizarLayout[1][0].usuario.usuNome}</div>
                <div className="jogador right">{OrganizarLayout[1][1].usuario.usuNome}</div>
                <div className="fundoCartas">
                    {Cartas.length > 0 ? (
                        <div>
                            {Cartas.map((value, index) => (
                                <img className="cartas" onClick={() => { JogarCarta(value) }} key={value.code} src={value.image} height={200} width={150}></img>
                            ))}
                        </div>
                    ) : (
                        <>
                            <img src='https://deckofcardsapi.com/static/img/back.png' height={200} width={150}></img>
                            <img src='https://deckofcardsapi.com/static/img/back.png' height={200} width={150}></img>
                            <img src='https://deckofcardsapi.com/static/img/back.png' height={200} width={150}></img>
                        </>
                    )}
                </div>
                <div className="jogador bottom">{usuario.usuNome}</div>
            </>
        ) : (<></>)}

    </div>)
}