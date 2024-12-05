"use client";
import { useContext, useEffect, useRef, useState } from "react";
import UserContext from "../../context/user.context";

import React from "react";
import HttpSocket from "@/app/http/http.socket";
import { useRouter } from "next/navigation";
import Loading from "@/app/components/loading";
import Chat from "@/app/components/Chat";
import Link from "next/link";
import Equipe from "@/app/components/Participantes";
import Participantes from "@/app/components/Participantes";

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

    function EntrarEquipe() {

    }



    useEffect(() => {
        socket.current = new HttpSocket();
        entrar();
    }, [])

    let participantes1 = ["participante 1", "participante 2"];
    let participantes2 = ["participante 3", "participante 4"];


    return (
        <>
            {loading ? (
                <div style={{ display: "flex", flexDirection: "column", alignItems: "center", height: "100vh", justifyContent: "Center" }}>
                    <Loading></Loading>
                    <h2>{MensagemSaida}</h2>
                </div>
            ) : !partida ? (
                // <div>
                //     <Link className='btn btn-primary' href="/sala">Retornar as salas</Link>
                //     <div>
                //         <Chat dados={chat}></Chat>
                //     </div>
                //     <div>
                //         <Equipe funcao={EntrarEquipe} idSala = {id}></Equipe>
                //     </div>
                //     <button>Pronto?</button>
                // </div>
                <div>
                    <div className="d-flex justify-content-between m-4">
                        <h1>Sala: {id}</h1>
                        <Link href="/sala" passHref> <button className="btn btn-info">Retornar às salas</button> </Link>
                    </div>

                    <div className="container">
                        <section className="row justify-content-between align-items-center my-4">
                            <div className="col text-center">
                                <h1 className="font-weight-bold text-dark">Escolha sua equipe</h1>
                            </div>
                        </section>

                        <section className="p-2 mt-5">
                            <div className="row justify-content-center">
                                <div className="col-12 col-md-5 mb-3">
                                    <div className="card shadow-lg">
                                        <div className="card-body d-flex flex-column align-items-center justify-content-center">
                                            <h2 className="mt-2">Equipe 1</h2>
                                            {participantes1.map((participantes) => (
                                                <Participantes key={participantes.id} participantes={participantes} />
                                            ))}
                                            <button className="btn btn-info mt-2 mb-2">Entrar na Equipe 1</button>
                                        </div>
                                    </div>
                                </div>
                                <div className="col-12 col-md-5 mb-3">
                                    <div className="card shadow-lg">
                                        <div className="card-body d-flex flex-column align-items-center justify-content-center">
                                            <h2 className="mt-2">Equipe 2</h2>
                                            {participantes2.map((participantes) => (
                                                <Participantes key={participantes.id} participantes={participantes} />
                                            ))}
                                            <button className="btn btn-info  mt-2 mb-2">Entrar na Equipe 2</button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </section>
                    </div>
                </div>

            ) : (
                <div>

                </div>
            )}

        </>
    );
}
