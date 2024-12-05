"use client";
import { useContext, useEffect, useRef, useState } from "react";
import UserContext from "../../context/user.context";

import React from "react";
import HttpSocket from "@/app/http/http.socket";
import { useRouter } from "next/navigation";
import Loading from "@/app/components/loading";
import Chat from "@/app/components/chat";
import Link from "next/link";

export default function Home({ params }) {

    const socket = useRef();

    const { id } = React.use(params)
    const { user } = useContext(UserContext);


    const [loading, setLoading] = useState(true);
    const [chat, setChat] = useState([]);
    const route = useRouter();
    const [MensagemSaida, setMensagemSaida] = useState("Carregando");

    function entrar() {
        if (user) {
            socket.current.init(id, user);
            socket.current.emit('entrar');
            socket.current.on('RespostaEntrar', (dados) => {
                if (dados.ok) {
                    setLoading(true);
                    setChat(chat => [...chat, `O jogador ${dados.Nome} ${dados.msg}`]);
                } else {
                    setMensagemSaida(`Sala cheia, não é possivel entrar!`);
                    setLoading(false);
                    setTimeout(() => {
                        route.push('/sala')
                    }, 1500);
                }
            });

            socket.current.on('RespostaSair', (dados) => {
                if (dados.ok) {
                    setChat(chat => [...chat, `O jogador ${dados.Nome} ${dados.msg}`]);
                }
            })
        } else {
            setLoading(false);
            setMensagemSaida(`Infelizmente ocorreu um erro, retornando!`);
            setTimeout(() => {
                route.push('/sala')
            }, 1500);
        }
    }



    useEffect(() => {
        socket.current = new HttpSocket();
        entrar();
    }, [])



    return (
        <>

            {loading ? (
                <div>
                    <Link className='btn btn-primary' href="/sala">Retornar as salas</Link>
                    <div>
                        <Chat dados={chat}></Chat>
                    </div>
                </div>
            ) : <div style={{ display: "flex", flexDirection: "column", alignItems: "center", height: "100vh", justifyContent: "Center" }}>
                <Loading></Loading>
                <h2>{MensagemSaida}</h2>
            </div>}

        </>
    );
}
