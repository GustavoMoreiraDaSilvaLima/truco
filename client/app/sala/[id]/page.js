"use client";

import { useContext, useEffect, useRef, useState } from "react";
import UserContext from "../../context/user.context";

import React from "react";
import HttpSocket from "@/app/http/http.socket";
import { useRouter } from "next/navigation";
import Loading from "@/app/components/loading";
import Chat from "@/app/components/Chat";
import Link from "next/link";
import Equipe from "@/app/components/Equipe";
import EquipeService from "@/app/service/equipe.service";
import Mesa from "@/app/components/mesa";
import Acoes from "@/app/components/acoes";
import '@/public/css/mesa.css'
import '@/public/css/sala.css'


export default function Sala({ params }) {

    const socket = useRef();
    const JogoId = useRef(0);
    const route = useRouter();
    const participante = useRef(null);
    const equipe = useRef(0);
    const rodada = useRef(0);
    const mao = useRef(0);

    const { id } = React.use(params)
    const { user } = useContext(UserContext);

    const Mensagem = useRef();
    const Pronto = useRef(false);


    const [participantes, setParticipantes] = useState([]);
    const [loading, setLoading] = useState(true);
    const [partida, setPartida] = useState(false);
    const pt = useRef(false)
    const [chat, setChat] = useState([]);

    const [MensagemSaida, setMensagemSaida] = useState("Carregando");



    async function BuscarParticipantes() {
        let sEquipe = new EquipeService();
        let participante = await sEquipe.ListarParticipantesSala(id);
        setParticipantes(participante);
    }
    function entrar() {
        if (user) {
            socket.current.init(id, user);
            socket.current.emit('entrar');
            socket.current.on('RespostaEntrar', (dados) => {
                if (dados.ok) {
                    setLoading(false);
                    setChat(chat => [...chat, `Sistema: ${dados.Nome} ${dados.msg}`]);
                    participante.current = dados.participante;
                } else {
                    setMensagemSaida(`Sala cheia, não é possivel entrar!`);
                    setTimeout(() => {
                        route.push('/sala')
                    }, 1500);
                }
            });

            socket.current.on('RespostaSair', (dados) => {
                if (dados.ok) {
                    setChat(chat => [...chat, `Sistema: ${dados.Nome} ${dados.msg}`]);
                    if(pt.current){
                        setLoading(true);
                        setMensagemSaida(`O participante ${dados.Nome} saiu da sala!\n por tanto a partida será finalizada!`);
                        socket.current.disconnect();
                        setTimeout(() => {

                            route.push('/sala')
                        },3000);
                    }else{
                        BuscarParticipantes();
                    }
                   
                }
            })
            socket.current.on('RespostaEntrarEquipe', (dados) => {
                if (dados.ok) {
                    setChat(chat => [...chat, `Sistema: ${dados.Nome} ${dados.msg}`]);
                    Pronto.current = false;
                    BuscarParticipantes();
                }
            })
            socket.current.on('EnviarMensagem', (dados) => {
                if (dados.ok) {
                    setChat(chat => [...chat, `${dados.Nome}: ${dados.msg}`]);
                }
            })
            socket.current.on('JogadorPronto', (dados) => {
                if (dados.ok) {
                    setChat(chat => [...chat, `Sistema: ${dados.msg}`]);
                    BuscarParticipantes();
                }
            })
            socket.current.on('Truco', (dado) =>{
                alert(dado.msg);
                if(dado.ok){
                    setChat(chat => [...chat, `Sistema:${dado.msg}`]);
                    //dado.equipe
                    //equipe tenho a equipe que trucou

                }   
            })
            socket.current.on('JogoPronto', (dado) => {
                if (dado.ok) {
                    console.log(dado);
                    JogoId.current = dado.jogo;
                    mao.current = dado.mao;
                    rodada.current = dado.rodada;
                    pt.current = true;
                    setLoading(true);
                    setMensagemSaida(`Carregando Partida!`);
                    setChat(["Partida Iniciada!"]);
                    setTimeout(() => {
                        setLoading(false);
                        setPartida(true);
                    }, 1500)
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

    function EntrarEquipe(equipeId) {
        socket.current.emit('EntrarEquipe', { equipeId });
    }



    function EnviarMensagem() {
        if (Mensagem.current.value) {
            socket.current.emit('EnviarMensagem', { mensagem: Mensagem.current.value });
            Mensagem.current.value = '';
        }
    }

    //Função para marcar jogador como pronto
    function ParticipantePronto() {
        Pronto.current = !Pronto.current;
        socket.current.emit('Pronto', { atributo: Pronto.current });
    }

    function Trucar(){
        socket.current.emit('Truco',{participante: participante.current});
    }


    useEffect(() => {
        BuscarParticipantes();
        socket.current = new HttpSocket();
        entrar();
        return () => {
            if (socket.current) {
                socket.current.disconnect(); // Desconecta do servidor
                console.log("Socket desconectado ao sair da página");
            }

        };
    }, [])
    return (
        <>
            {loading ? (
                <div style={{ display: "flex", flexDirection: "column", alignItems: "center", height: "100vh", justifyContent: "Center" }}>
                    <Loading></Loading>
                    <h2>{MensagemSaida}</h2>
                </div>
            ) : !partida ? (
                <div>
                    <div className="d-flex justify-content-between m-4">
                        <h1>Sala: {id}</h1>
                        <Link href="/sala" passHref> <button className="btn btn-info">Retornar às salas</button> </Link>
                    </div>

                    <section>
                        <Equipe funcao={EntrarEquipe} UserAtual={user} participantes={participantes} funcaoPronto={ParticipantePronto}></Equipe>
                    </section>
                    <section className="col-md-3 col-sm-4">
                        <Chat dados={chat}></Chat>
                        <div>
                            <div className="input-group flex-nowrap pt-3">
                                <input onKeyDown={(e) => { if (e.key === 'Enter') { EnviarMensagem() } }} type="text" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" htmlFor='Mensagem' placeholder="Mensagem" ref={Mensagem}></input>
                                <button htmlFor='Mensagem' className="btn btn-primary ml-3" onClick={EnviarMensagem}>Envio</button>
                            </div>
                        </div>
                    </section>
                </div>
            ) : (
                <div style={{ position: 'relative' }}>
                    <section>
                        <Mesa Sala={id} usuario={user} socket={socket.current} jogo={JogoId.current} rodada ={rodada.current} equipeUser={equipe.current} participante={participante} mao={mao.current} chat={chat} SetChat={setChat}></Mesa>
                    </section>
                    <section className="col-md-3 col-sm-4">
                        <Chat dados={chat}></Chat>
                        <div>
                            <div className="input-group flex-nowrap pt-3">
                                <input onKeyDown={(e) => { if (e.key === 'Enter') { EnviarMensagem() } }} type="text" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" htmlFor='Mensagem' placeholder="Mensagem" ref={Mensagem}></input>
                                <button htmlFor='Mensagem' className="btn btn-primary ml-3" onClick={EnviarMensagem}>Envio</button>
                            </div>
                        </div>
                    </section>
                    <section>
                        <Acoes></Acoes>
                    </section>

                    <div className="placarEsquerdo">
                        <div>Equipe 1: <span>10 Pontos</span></div>
                    </div>

                    <div className="placarDireito">
                        <div>Equipe 2: <span>15 Pontos</span></div>
                    </div>

                    <button onClick={Trucar} className="trucar">Trucar +3</button>
                </div>

            )}
        </>
    );
}
