import { useEffect, useState } from "react"
import EquipeService from "../service/equipe.service";


export default function Equipe({ funcao, idSala }) {


    const [lista, setLista] = useState([]);
    async function BuscarEquipes() {
        let sEquipe = new EquipeService();
        let equipes = await sEquipe.ListarEquipe();
        console.log(equipes)
        setLista(equipes);
        console.log(lista);
    }

    useEffect(() => {
        BuscarEquipes();
    }, [])

    return (
        <div>
            <h1>Equipes</h1>
            <div>
                {lista ? lista.map((value, index) => (
                    <div key={index}>
                        <h1>{value.eqpDescricao}</h1>
                        
                        <button onClick={() => funcao(value.eqpId, idSala)}></button>
                    </div>)) : (
                    <div>
                        <h1>Ocorreu um erro Interno no serivdor</h1>
                    </div>)}

            </div>
        </div>
    )
}