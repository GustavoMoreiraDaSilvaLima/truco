"use client";
import { useContext, useEffect, useRef, useState } from "react";
import UserContext from "../../context/user.context";

import React from "react";
import HttpSocket from "@/app/http/http.socket";
import { useRouter } from "next/navigation";
import Loading from "@/app/components/loading";

export default function Home({ params }) {
    const socket = new HttpSocket();
    const { id } = React.use(params)
    const { user } = useContext(UserContext);
    const [ loading, setLoading ] = useState(false);
    const {validaSala, setValidaSala} = useState(false);
    const route = useRouter();
    let vez = 0

    if (user && vez == 0) {
        socket.init(id, user);
        socket.emit('entrar');
        socket.on('RespostaEntrar', (dados) => {
            console.log(dados);
            if (dados.ok) {
                setLoading(true);
            } else {
                setLoading(false);
                setTimeout(()=>{
                    route.push('/sala')
                },1500);
            }
            console.log(dados);
        });
        vez = 1
    }

    useEffect(() => {

    }, [])



    return (
        <>
        
            {loading ? (
                <div style={{ display: "flex", flexDirection: "column", alignItems: "center", height: "100vh", justifyContent: "Center" }}>
                    <h2>Carregando, Sala aguarde</h2>
                </div>
            ) : <div style={{ display: "flex", flexDirection: "column", alignItems: "center", height: "100vh", justifyContent: "Center" }}>
                <Loading></Loading>
                <h2>Sala cheia, retornando...</h2>
            </div>}

        </>
    );
}
