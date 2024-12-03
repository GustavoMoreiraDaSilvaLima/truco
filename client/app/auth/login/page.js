"use client";
import { useRouter } from "next/navigation";
import { useContext, useState } from "react";
import LoginService from "@/app/service/login.service";
import CadastrarService from "@/app/service/cadastrar.service";
import ToastNotification, { showSuccessToast } from "@/app/components/toasts/index";
import { showErrorToast } from "@/app/components/toasts/index";
import UserContext from "@/app/context/user.context";
import Link from "next/link";

export default function Login() {
    const router = useRouter();
    const [email, setEmail] = useState("");
    const [senha, setSenha] = useState("");
    const [nome, setNome] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const [isRegister, setIsRegister] = useState(false);
    const [error, setError] = useState({});

    const { setUser } = useContext(UserContext);

    function validar() {
        const novoErro = {};
        const regexEmail = /^[a-z0-9.]+@[a-z0-9]+\.[a-z]+(\.[a-z]+)?$/i;

        if (!email) {
            novoErro.email = "*Campo obrigatório";
        } else if (!regexEmail.test(email)) {
            novoErro.email = "*Email inválido";
        }

        if (!senha) {
            novoErro.senha = "*Campo obrigatório";
        }


        if (isRegister && !nome) {
            novoErro.nome = "*Campo obrigatório";
        }


        setError(novoErro);

        return Object.keys(novoErro).length === 0;
    }

    function limpar() {
        setEmail("");
        setSenha("");
        setNome("");
    }

    function trocarEstado() {
            setIsRegister(!isRegister);
        limpar();
    }

    async function CriarUsuario() {
        setIsLoading(true);
        if (validar()) {
            const sCadastrar = new CadastrarService();
            const cadastrar = await sCadastrar.cadastrar(nome, email, senha);
            if (cadastrar) {
                setIsRegister(false); // Altera para tela de login após cadastro
                showSuccessToast("Usuário cadastrado com sucesso");
                limpar();
            } else {
                showErrorToast("Erro ao cadastrar usuário");
            }
            setIsLoading(false);
        } else {
            setIsLoading(false);
        }
    }

    async function login() {
        setIsLoading(true);

        try {
            if (validar()) {
                const sLogin = new LoginService();
                const login = await sLogin.login(email, senha);
                if (login) {
                    localStorage.setItem('usuario', JSON.stringify(login.usuario));
                    setUser(login.usuario);
                    router.push("/sala");
                    limpar();
                } else {
                    showErrorToast("Credenciais inválidas");
                }
                setIsLoading(false);
            } else {
                setIsLoading(false);
            }
        } catch (error) {
            showErrorToast("Erro ao realizar login");
            console.error(error);
        }
    }

    return (
        <div className="login-box container d-flex justify-content-center align-items-center vh-100">
            <div className="card card-outline card-primary" style={{ maxWidth: "400px", width: "100%" }}>
                <div className="card-header text-center">
                    <a className="link-dark text-center link-offset-2 link-opacity-100 link-opacity-50-hover">
                        <h1 className="mb-0"><b>TRUCADA</b> FOFA</h1>
                    </a>
                </div>
                <div className="card-body login-card-body">
                    <p className="login-box-msg text-center">
                        {isRegister ? "Crie sua conta" : "Faça login"}
                    </p>

                    {isRegister ? (
                        <div className="mb-3">
                            <div className="mb-3">
                                <input
                                    type="text"
                                    className="form-control"
                                    placeholder="Digite seu Nome"
                                    value={nome}
                                    onChange={(e) => setNome(e.target.value)}
                                />
                                {error.nome && <div className="text-danger">{error.nome}</div>}
                            </div>

                            <div className="mb-3">
                                <input
                                    type="email"
                                    className="form-control"
                                    placeholder="Digite seu email"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                />
                                {error.email && <div className="text-danger">{error.email}</div>}
                            </div>

                            <div className="mb-3">
                                <input
                                    type="password"
                                    className="form-control"
                                    placeholder="Digite sua senha"
                                    value={senha}
                                    onChange={(e) => setSenha(e.target.value)}
                                />
                                {error.senha && <div className="text-danger">{error.senha}</div>}
                            </div>

                            <div className="d-flex justify-content-end mb-2">
                                <button
                                    className="btn btn-link"
                                    onClick={() =>
                                        trocarEstado()
                                    } // Alterna para tela de login
                                >
                                    Já possui conta?
                                </button>
                            </div>
                        </div>
                    ) : (
                        <>
                            <div className="mb-3">
                                <input
                                    type="email"
                                    className="form-control"
                                    placeholder="Digite seu email"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                />
                                {error.email && <div className="text-danger">{error.email}</div>}
                            </div>

                            <div className="mb-3">
                                <input
                                    type="password"
                                    className="form-control"
                                    placeholder="Digite sua senha"
                                    value={senha}
                                    onChange={(e) => setSenha(e.target.value)}
                                />
                                {error.senha && <div className="text-danger">{error.senha}</div>}
                            </div>

                            <div className="d-flex justify-content-end mb-2">
                                <button
                                    className="btn btn-link"
                                    onClick={() => trocarEstado()} // Alterna para tela de cadastro
                                >
                                    Crie sua conta
                                </button>
                            </div>
                        </>
                    )}

                    <div className="d-flex justify-content-center">
                        <button
                            className="btn btn-primary w-100"
                            onClick={isRegister ? CriarUsuario : login}
                            disabled={isLoading || !email || !senha}
                        >
                            {isRegister ? "Cadastrar" : "Entrar"}
                        </button>
                    </div>
                </div>
                <ToastNotification />
            </div>
        </div >
    );
}
