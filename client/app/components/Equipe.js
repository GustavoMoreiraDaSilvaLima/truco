import { useEffect } from "react"

 
export default function Equipe({funcao, idSala}) {
    
    function BuscarEquipes(){

    }

    useEffect(() => {
        
    }, [])

    return (
        <div>
            <h1>Equipes</h1>
            <div>
                <div>
                    <h2>Equipe 1</h2>
                    <h3>Participantes</h3>
                    <button onClick={funcao}>Entrar</button>
                </div>
                <div>
                    <h2>Equipe 2</h2>
                    <h3>Participantes</h3>
                    <button>Entrar</button>
                </div>
            </div>
        </div>
    )
}