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
        <div className="container">
            {/* Cabeçalho */}
            <div className="row justify-content-between bg-primary align-items-center p-3 rounded-3 shadow">
                <div className="col text-center">
                    <h1 className="font-weight-bold text-white">TRUCADA FOFA</h1>
                </div>

                <div className="col-auto">
                    <div className="dropdown">
                        <div >
                            <span className="text-white me-2 mr-2">{user?.usuNome}</span>
                            <img
                                src="/img/download.jpg"
                                alt="Avatar"
                                className="rounded-circle"
                                style={{ width: "50px", height: "50px", cursor: "pointer" }}
                                onClick={toggleDropdown}
                            />
                        </div>
                        {dropdownOpen && (
                            <ul className="dropdown-menu show" aria-labelledby="dropdownMenuButton">
                                <li>
                                    <Link className="dropdown-item" href="auth/login/logout">Sair</Link>
                                </li>
                            </ul>
                        )}
                    </div>
                </div>
            </div>

            {/* Título e Botão Criar Sala */}
            <div className="row justify-content-between align-items-center my-4">
                <div className="col text-center">
                    <h3 className="font-weight-bold text-white">Salas Disponíveis</h3>
                </div>
                <div className="col-auto">
                    <button className="btn btn-primary" onClick={toggleModal}>
                        Criar Sala
                    </button>
                </div>
            </div>

            {/* Exibição das Salas */}
            <div className="row justify-content-center">
                {salas.length === 0 ? (
                    <div className="col-12 text-center">
                        <p className="text-white">Nenhuma sala disponível no momento.</p>
                    </div>
                ) : (
                    salas.map((sala) => (
                        <div key={sala.salId} className="col-12 col-md-4 mb-4">
                            <div className="card shadow-sm hover-shadow">
                                <div className="card-body">
                                    <h5 className="card-title text-truncate">#{sala.salId} - {sala.salNome}</h5>
                                    <button className="btn btn-success w-100 mt-3">Entrar</button>
                                </div>
                            </div>
                        </div>
                    ))
                )}
            </div>

            <Modal
                isOpen={isModalOpen}
                toggleModal={toggleModal}
                title="Criar Nova Sala"
                salvar={criarSala}
            >
                <input type="text" value={nome} onChange={(e) => setNome(e.target.value)} className="form-control mb-3" placeholder="Nome da Sala" />
                {erro.nome && <p className="text-danger">{erro.nome}</p>}
            </Modal>
        </div>
    );
}
