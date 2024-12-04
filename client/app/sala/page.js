"use client";
import { useContext, useEffect, useState } from "react";
import HomeService from "@/app/service/home.service";
import Modal from "../components/modal";
import UserContext from "../context/user.context";
import Link from "next/link";

export default function Home() {
    const [dropdownOpen, setDropdownOpen] = useState(false);
    const [nome, setNome] = useState("");
    const [salas, setSalas] = useState([]);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [erro, setErro] = useState({});



    const { user } = useContext(UserContext);

    const toggleModal = () => setIsModalOpen(prevState => !prevState);
    const toggleDropdown = () => setDropdownOpen(!dropdownOpen);

    async function getSalas() {
        const sHome = new HomeService();
        const salas = await sHome.salas();
        setSalas(salas);
    }

    useEffect(() => {
        getSalas(); // Carrega as salas ao iniciar o componente
    }, []);

    function validar() {
        let erros = {};

        if (!nome) {
            erros.nome = "*Informe o nome da sala";
        }

        setErro(erros);
        return Object.keys(erros).length === 0;
    }

    function limpar() {
        setNome("");
        setErro({});
    }

    async function criarSala() {
        if (validar()) {
            let sHome = new HomeService();
            const salaCriada = await sHome.criarSala(nome, user.usuId);
            if (salaCriada) {
                limpar();
                getSalas();
                setIsModalOpen(false); // Fecha o modal
            }
        }
    }



    return (

<>
    {/* Cabeçalho */}
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
                            <Link className="nav-link" href="/">Home</Link>
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


    <main style={{ minHeight: 'calc(100vh - 160px)' }}>
        <div className="container">
            <section className="row justify-content-between align-items-center my-4">
                <div className="col text-center">
                    <h1 className="font-weight-bold text-dark">Salas Disponíveis</h1>
                </div>
                <div className="col-auto">
                    <button className="btn btn-warning text-dark" onClick={toggleModal}>
                        Criar Sala
                    </button>
                </div>
            </section>

            <section className="card shadow-sm p-4">
                <div className="row justify-content-center">
                    {salas.length === 0 ? (
                        <div className="col-12 text-center">
                            <p className="text-dark">Nenhuma sala disponível no momento.</p>
                        </div>
                    ) : (
                        salas.map((sala) => (
                            <div key={sala.salId} className="col-12 col-md-4 mb-4">
                                <div className="card shadow-sm hover-shadow">
                                    <div className="card-body">
                                        <h5 className="card-title text-truncate">#{sala.salId} - {sala.salNome}</h5>
                                        <Link href={`/sala/${sala.salId}`} className="btn btn-success w-100 mt-3">Entrar</Link>
                                    </div>
                                </div>
                            </div>
                        ))
                    )}
                </div>
            </section>
        </div>
    </main>

    <Modal
        isOpen={isModalOpen}
        toggleModal={toggleModal}
        title="Criar Nova Sala"
        salvar={criarSala}
    >
        <input type="text" value={nome} onChange={(e) => setNome(e.target.value)} className="form-control mb-3" placeholder="Nome da Sala" />
        {erro.nome && <p className="text-danger">{erro.nome}</p>}
    </Modal>

    <footer className="bg-success text-white py-4 mt-4">
        <div className="container d-flex justify-content-center align-items-center flex-column">
            <p className="mb-2">© 2024 Truco FIPP - Todos os direitos reservados</p>
        </div>
    </footer>
</>



    );
}
