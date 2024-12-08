import '@/public/css/mesa.css'
import { useEffect, useRef } from 'react'
import ParticipanteService from '../service/participante.service'

export default function Mesa({ Sala, usuario }) {

    async function pegarParticipantes(){
        const sParticipante = new ParticipanteService();
        let participantes = await sParticipante.ListarParticipantesSala(Sala);
        console.log(participantes);
        organizar(participantes);
    }

    //Função para reorganizar a lógica de manipulação visual do local
    function organizar(lista){
        let equipeUser = ''

    }

    useEffect(() => {
        pegarParticipantes();
        
    },
        [])

    return (<div className='body'>
        <div className="mesa">
            <div className="mesa-centro">
                <img src='https://deckofcardsapi.com/static/img/back.png' height={100} width={75}></img>
            </div>
        </div>
        <div className="jogador top">Jogador 1</div>
        <div className="jogador left">Jogador 2</div>
        <div className="jogador right">Jogador 3</div>
        <div className="jogador bottom">{usuario.usuNome}</div>
    </div>)
}