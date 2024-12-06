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
        <div className="container">
            <section className="row justify-content-between align-items-center my-4">
                <div className="col text-center">
                    <h1 className="font-weight-bold text-dark">Escolha sua equipe</h1>
                </div>
            </section>

            <section className="p-2 mt-5">
                <div className="row justify-content-center">
                    {lista.map((equipe, index) => (
                        <div className="col-12 col-md-5 mb-3">
                            <div className="card shadow-lg">
                                <div className="card-body d-flex flex-column align-items-center justify-content-center">
                                    <div key={index}>
                                        <h2 className="mt-2">{equipe.eqpDescricao}</h2>
                                        <h3>Participantes:</h3>
                                        {participantes
                                            .filter(
                                                (participante) =>
                                                    participante.equipe && participante.equipe.eqpId === equipe.eqpId
                                            )
                                            .map((participante, idx) => (
                                                <div>
                                                    <div key={idx}>
                                                        <div className="d-flex m-4 align-items-center">
                                                            <button className="btn-sm btn-success mr-2">Confirmar</button>
                                                            <h4 className="ml-3">{participante.usuario.usuNome}</h4>
                                                        </div>
                                                    </div>
                                                </div>
                                            ))}
                                        <button onClick={() => funcao(equipe.eqpId)}>
                                            Entrar na Equipe
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </section>
        </div>
    );
}
