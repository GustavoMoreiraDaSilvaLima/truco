import '@/public/css/mesa.css'
import { useEffect, useRef, useState } from 'react'
import ParticipanteService from '@/app/service/Participante.service';


export default function Mesa({ Sala, usuario }) {

    const [OrganizarLayout, setOrganizarLayout] = useState([[], []]);

    async function pegarParticipantes() {
        const sParticipante = new ParticipanteService();
        let participantes = await sParticipante.ListarParticipantesSala(Sala);
        console.log(participantes);
        organizar(participantes);
    }

    //Função para reorganizar a lógica de manipulação visual do local
    function organizar(lista) {
        const equipeUsuario = lista.filter(participante => participante.usuario.usuId == usuario.usuId);
        console.log(equipeUsuario[0]);
        let equipeUser = equipeUsuario[0].equipe.eqpId;
        let equipe1 = lista.filter(participante => participante.equipe.eqpId == equipeUser && participante.usuario.usuId != usuario.usuId);
        let equipe2 = lista.filter(participante => participante.equipe.eqpId != equipeUser);
        console.log(equipe1, equipe2);
        setOrganizarLayout([equipe1, equipe2]);
        console.log(OrganizarLayout);
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
        {OrganizarLayout[0].length == 1 && OrganizarLayout[1].length == 2 ? (
            <>
                <div className="jogador top">{OrganizarLayout[0][0].usuario.usuNome}</div>
                <div className="jogador left">{OrganizarLayout[1][0].usuario.usuNome}</div>
                <div className="jogador right">{OrganizarLayout[1][1].usuario.usuNome}</div>
                <div className="jogador bottom">{usuario.usuNome}</div>
            </>
        ) : (<></>)}

    </div>)
}