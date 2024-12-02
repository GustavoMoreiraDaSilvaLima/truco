"use client";

import Link from "next/link";
import { useContext, useEffect, useState } from "react";
import UserContext from "./context/user.context";




export default function Home() {

    const { user, setUser } = useContext(UserContext);
    const {UsuarioCarregao, setUsuarioCarregao} = useState(null);
    console.log(user);

    useEffect(() => {
        
    }, []);

    return (
        <>
            <header className="mt-5">
                <div className="container">
                    <h1>Truco FIPP</h1>
                    <nav>
                        <ul>
                            <li><a href="#sobre">Sobre</a></li>
                            <li><a href="#regras">Regras</a></li>
                            <li><a href="#torneios">Torneios</a></li>
                            <li><a href="#contato">Contato</a></li>
                        </ul>
                    </nav>
                </div>
                <div className="col-auto">
                    {user ?
                        <>
                            <h5>Olá {user.usuNome}</h5>
                            <Link className='btn btn-danger' href='/auth/login/logout'>Sair</Link>
                        </> :
                        <>
                            <h5>Entre ou Registre-se agora</h5>
                            <Link className= 'btn btn-primary' href='/auth/login'>Login</Link>
                        </>
                    }

                </div>
            </header>
            <main>
                <section id="sobre">
                    <div className="container">
                        <h2>Sobre o Truco FIPP</h2>
                        <p>O Truco FIPP é uma tradição que une alunos, ex-alunos e entusiastas da Faculdade de Informática de Presidente Prudente. Combinando estratégia, diversão e espírito competitivo, nossos eventos são conhecidos por criar memórias inesquecíveis.</p>
                    </div>
                </section>

                <section id="regras">
                    <div className="container">
                        <h2>Regras do Truco</h2>
                        <p>O jogo segue as regras clássicas do truco paulista, com algumas variações regionais. Conheça as principais:</p>
                        <ul>
                            <li>Baralho reduzido (4 a 7, Q, J, K e A).</li>
                            <li>Pontuação até 12 pontos.</li>
                            <li>Truco, Seis, Nove e Doze fazem parte do jogo estratégico.</li>
                            <li>Manilhas definidas pelo "vira".</li>
                        </ul>
                    </div>
                </section>

                <section id="torneios">
                    <div className="container">
                        <h2>Torneios</h2>
                        <p>Os torneios de Truco FIPP são realizados anualmente e atraem jogadores de todo o estado. Inscreva-se e mostre suas habilidades na mesa!</p>
                        <a href="#" className="btn">Saiba mais</a>
                    </div>
                </section>
            </main>
            <footer>
                <div className="container">
                    <p>&copy; 2024 Truco FIPP. Todos os direitos reservados.</p>
                </div>
            </footer>
        </>
    );
}
