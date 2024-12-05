"use client";
import { useContext, useEffect, useRef, useState } from "react";
import UserContext from "../../context/user.context";

import React from "react";
import HttpSocket from "@/app/http/http.socket";
import { useRouter } from "next/navigation";
import Loading from "@/app/components/loading";
import Chat from "@/app/components/chat";
import Link from "next/link";
import Equipe from "@/app/components/Equipe";

export default function Home({ params }) {

    const socket = useRef();

    const { id } = React.use(params)
    const { user } = useContext(UserContext);


    const [loading, setLoading] = useState(true);
    const [partida, setPartida] = useState(false);
    const [chat, setChat] = useState([]);
    const route = useRouter();
    const [MensagemSaida, setMensagemSaida] = useState("Carregando");

    function entrar() {
        if (user) {
            socket.current.init(id, user);
            socket.current.emit('entrar');
            socket.current.on('RespostaEntrar', (dados) => {
                if (dados.ok) {
                    setLoading(false);
                    setChat(chat => [...chat, `O jogador ${dados.Nome} ${dados.msg}`]);
                } else {
                    setMensagemSaida(`Sala cheia, não é possivel entrar!`);
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
            setLoading(true);
            setMensagemSaida(`Infelizmente ocorreu um erro, retornando!`);
            setTimeout(() => {
                route.push('/sala')
            }, 1500);
        }
    }

    function EntrarEquipe(){

    }



    useEffect(() => {
        socket.current = new HttpSocket();
        entrar();
    }, [])



    return (
        <>
            <h1>Sala: {id}</h1>
            {loading ? (
                <div style={{ display: "flex", flexDirection: "column", alignItems: "center", height: "100vh", justifyContent: "Center" }}>
                    <Loading></Loading>
                    <h2>{MensagemSaida}</h2>
                </div>
            ) : !partida ?(
                <div>
                    <Link className='btn btn-primary' href="/sala">Retornar as salas</Link>
                    <div>
                        <Chat dados={chat}></Chat>
                    </div>
                    <div>
                        <Equipe funcao={EntrarEquipe} idSala = {id}></Equipe>
                    </div>
                    <button>Pronto?</button>
                </div>
            ):(
                <div>

                </div>
            )}

        </>
    );
}
