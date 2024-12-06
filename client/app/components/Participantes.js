import { useEffect } from "react"


export default function Participantes({ participantes }) {

    function BuscarEquipes() {

    }

    useEffect(() => {

    }, [])

    return (
        <div>
            <div>
                <div className="d-flex m-4 align-items-center">
                    <button className="btn-sm btn-success mr-2">Confirmar</button>
                    <h4 className="ml-3">{participantes}</h4>
                </div>
            </div>
        </div>
    )

}