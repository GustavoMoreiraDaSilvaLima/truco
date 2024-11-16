"use client";
import { useEffect, useState } from "react";
import HomeService from "@/app/service/home.service";
import Modal from "./components/modal";

export default function Home() {
    const [dropdownOpen, setDropdownOpen] = useState(false);
    const [salas, setSalas] = useState([]);
    const [isModalOpen, setIsModalOpen] = useState(false);

    const toggleModal = () => setIsModalOpen(prevState => !prevState);
    const toggleDropdown = () => setDropdownOpen(!dropdownOpen);

    useEffect(() => {
        const sHome = new HomeService();
        const getSalas = async () => {
            const salas = await sHome.salas();
            setSalas(salas);
            console.log(salas);
        };
        getSalas();
    }, []);

    return (
        <div className="container">
            {/* Cabeçalho */}
            <div className="row justify-content-between bg-primary align-items-center p-3 rounded-3 shadow">
                <div className="col text-center">
                    <h1 className="font-weight-bold text-white">TRUCADA FOFA</h1>
                </div>

                <div className="col-auto">
                    <div className="dropdown">
                        <img
                            src="/img/download.jpg"
                            alt="Avatar"
                            className="rounded-circle"
                            style={{ width: "50px", height: "50px", cursor: "pointer" }}
                            onClick={toggleDropdown}
                        />
                        {dropdownOpen && (
                            <ul className="dropdown-menu show" aria-labelledby="dropdownMenuButton">
                                <li>
                                    <button className="dropdown-item" onClick={() => alert("Saindo...")}>Sair</button>
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
            >
                <p>Conteúdo do Modal - Aqui você pode criar uma nova sala.</p>
            </Modal>
        </div>
    );
}
