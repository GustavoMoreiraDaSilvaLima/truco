"use client";
import { useContext, useEffect, useState } from "react";
import HomeService from "@/app/service/home.service";
import Modal from "../../components/modal";
import UserContext from "../../context/user.context";
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
      <div>
        <h1>Local onde fica o jogo</h1>
        </div>
    );
}
