"use client";

import Link from "next/link";
import { useContext, useEffect, useState } from "react";
import UserContext from "./context/user.context";




export default function Home() {

    const { user, setUser } = useContext(UserContext);
    const { UsuarioCarregao, setUsuarioCarregao } = useState(null);
    console.log(user);

    useEffect(() => {

    }, []);

    return (
        <>
            <header>
                <nav className="navbar navbar-expand-lg navbar-light bg-light">
                    <div className="container-fluid d-flex align-items-center justify-content-between">
                        <h2 className="text-success mb-0">Truca<span className="text-dark">Fofo</span></h2>

                        <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarTogglerDemo01" aria-controls="navbarTogglerDemo01" aria-expanded="false" aria-label="Toggle navigation">
                            <span className="navbar-toggler-icon"></span>
                        </button>

                        <div className="collapse navbar-collapse" id="navbarTogglerDemo01">
                            <ul className="navbar-nav mx-auto mb-2 mb-lg-0">
                                <li className="nav-item">
                                    <Link className="nav-link" href="#">Home</Link>
                                </li>
                                {user ? (
                                    <li className="nav-item">
                                        <Link className="nav-link" href="/sala">Salas</Link>
                                    </li>
                                ) : null}
                            </ul>

                            <div className="d-flex">
                                {user ? (
                                    <>
                                        <div className="d-flex align-items-center">
                                            <h5 className="mb-0 me-2 mr-3">{user.usuNome}</h5>
                                            <Link className="btn btn-danger" href="/auth/login/logout">Sair</Link>
                                        </div>
                                    </>
                                ) : (
                                    <Link className="btn btn-success" href="/auth/login">Login</Link>
                                )}
                            </div>
                        </div>
                    </div>
                </nav>
            </header>

            <main style={{ minHeight: 'calc(100vh - 80px)', paddingBottom: '4rem' }}>
                <section id="sobre">
                    <div className="container my-4">
                        <div className="card shadow-sm">
                            <div className="card-body">
                                <h2 className="card-title">Sobre o Truco FIPP</h2>
                                <p className="card-text">
                                    O Truco FIPP é uma tradição que une alunos, ex-alunos e entusiastas
                                    da Faculdade de Informática de Presidente Prudente. Combinando
                                    estratégia, diversão e espírito competitivo, nossos eventos são
                                    conhecidos por criar memórias inesquecíveis.
                                </p>
                            </div>
                        </div>
                    </div>
                </section>

                <section id="regras-adicionais">
                    <div className="container my-4">
                        <div className="card shadow-sm">
                            <div className="card-body">
                                <h2 className="card-title">Regras do Truco Paulista</h2>
                                <ul>
                                    <li><strong>Baralho e Valor das Cartas:</strong>
                                        <ul>
                                            <li>O baralho tem 40 cartas e a ordem de força das cartas, do maior para o menor, é: 3, 2, A, K, J, Q, 7, 6, 5, 4.</li>
                                            <li>O “2” é mais forte que o “A”, e a "Q" é mais fraca que o “J”.</li>
                                        </ul>
                                    </li>
                                    <li><strong>Número de Jogadores:</strong>
                                        <ul>
                                            <li>São 4 jogadores, divididos em duplas.</li>
                                            <li>O parceiro de cada jogador está diretamente oposto a ele na mesa.</li>
                                        </ul>
                                    </li>
                                    <li><strong>Objetivo do Jogo:</strong>
                                        <ul>
                                            <li>O objetivo é fazer 12 pontos.</li>
                                            <li>Cada mão (composta por 3 rodadas) pode valer de 1 a 12 pontos, dependendo das apostas.</li>
                                        </ul>
                                    </li>
                                    <li><strong>Distribuição de Cartas:</strong>
                                        <ul>
                                            <li>Cada jogador recebe 3 cartas.</li>
                                            <li>O embaralhador vira uma carta, que define a manilha (a carta mais forte da rodada).</li>
                                        </ul>
                                    </li>
                                    <li><strong>Termos e Definições:</strong>
                                        <ul>
                                            <li><strong>Mão:</strong> Vale 1 ponto, mas pode valer mais dependendo das apostas.</li>
                                            <li><strong>Rodada:</strong> Cada jogador coloca uma carta na mesa. A carta mais forte vence a rodada.</li>
                                            <li><strong>Vira:</strong> Carta virada que define as manilhas.</li>
                                            <li><strong>Manilhas:</strong> A carta que vem logo após a vira é a mais forte de cada rodada.</li>
                                        </ul>
                                    </li>
                                    <li><strong>Apostas:</strong>
                                        <ul>
                                            <li><strong>Truco:</strong> Pedido de aumento de aposta. A mão que inicialmente valia 1 ponto passa a valer 2 pontos se o adversário aceitar.</li>
                                            <li><strong>Seis:</strong> Se alguém pedir Truco, o adversário pode pedir Seis, fazendo a mão valer 6 pontos.</li>
                                            <li><strong>Nove:</strong> Se alguém pedir Seis, o adversário pode pedir Nove, fazendo a mão valer 9 pontos.</li>
                                            <li><strong>Doze:</strong> Se alguém pedir Nove, o adversário pode pedir Doze, fazendo a mão valer 12 pontos.</li>
                                        </ul>
                                    </li>
                                    <li><strong>Mãos Especiais:</strong>
                                        <ul>
                                            <li><strong>Mão de Onze:</strong> Quando uma dupla chega a 11 pontos, pode olhar as cartas do parceiro e decidir se jogam ou "correm" (desistem). Se jogarem, a mão vale 3 pontos.</li>
                                            <li><strong>Mão de Ferro:</strong> Quando ambas as duplas chegam a 11 pontos, ela é disputada com regras especiais.</li>
                                        </ul>
                                    </li>
                                    <li><strong>Esconder Carta:</strong>
                                        <ul>
                                            <li>É possível esconder uma carta, que não vale nada.</li>
                                            <li>Porém, isso não pode ser feito na primeira rodada da mão.</li>
                                        </ul>
                                    </li>
                                    <li><strong>Critérios de Empate:</strong>
                                        <ul>
                                            <li>Se empatar na 1ª rodada, quem ganhar a 2ª vence a mão.</li>
                                            <li>Se empatar na 2ª rodada, quem ganhar a 1ª vence a mão.</li>
                                            <li>Se empatar na 1ª e 2ª rodadas, quem ganhar a 3ª vence.</li>
                                            <li>Se empatar na 3ª rodada, quem ganhar a 1ª vence a mão.</li>
                                            <li>Se todas as rodadas empatarem, ninguém ganha ponto.</li>
                                        </ul>
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </section>

                <section id="torneios">
                    <div className="container my-4">
                        <div className="card shadow-sm">
                            <div className="card-body">
                                <h2 className="card-title">Torneios</h2>
                                <p className="card-text">
                                    Os torneios de Truco FIPP são realizados anualmente e atraem
                                    jogadores de todo o estado. Inscreva-se e mostre suas habilidades na
                                    mesa!
                                </p>
                            </div>
                        </div>
                    </div>
                </section>
            </main>


            <footer className="bg-success text-white py-4">
                <div className="container d-flex justify-content-center align-items-center flex-column">
                    <p className="mb-2">© 2024 Truco FIPP - Todos os direitos reservados</p>
                </div>
            </footer>

        </>
    );
}
