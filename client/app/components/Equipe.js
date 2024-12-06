import { useEffect, useState } from "react"
import EquipeService from "../service/equipe.service";


export default function Equipe({ funcao, idSala, participantes }) {


    const [lista, setLista] = useState([]);
    


    async function BuscarEquipes() {
        let sEquipe = new EquipeService();
        let equipes = await sEquipe.ListarEquipe();
        setLista(equipes);
    }


    
    useEffect(() => {
        BuscarEquipes();
    }, [])

    return (
        <div>
            <h1>Equipes</h1>
            <div>
                {lista.map((equipe, index) => (
                    <div key={index}>
                        <h2>{equipe.eqpDescricao}</h2>
                        <h3>Participantes:</h3>
                        {participantes
                            .filter(
                                (participante) =>
                                    participante.equipe && participante.equipe.eqpId === equipe.eqpId
                            )
                            .map((participante, idx) => (
                                <div key={idx}>
                                    <p>{participante.usuario.usuNome}</p>
                                </div>
                            ))}
                        <button onClick={() => funcao(equipe.eqpId)}>
                            Entrar na Equipe
                        </button>
                    </div>
                ))}
            </div>
        </div>
    );
}
