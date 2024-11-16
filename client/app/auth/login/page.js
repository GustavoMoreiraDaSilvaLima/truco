"use client";
import { useRouter } from "next/navigation"
import { useState } from "react";
import LoginSerive from "@/app/service/login.service";
import ToastNotification from "@/app/components/toasts/index";
import { showErrorToast } from "@/app/components/toasts/index";


export default function Login() {
    const router = useRouter();
    const [email, setEmail] = useState("");
    const [senha, setSenha] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState({});

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

        setError(novoErro);

        return Object.keys(novoErro).length === 0;
    }

    async function login() {
        setIsLoading(true);

        try {
            if (validar()) {
                const sLogin = new LoginSerive();
                const login = await sLogin.login(email, senha);
                if (login) {
                    router.push("/admin");
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
        }
    }

    function limpar() {
        setEmail("");
        setSenha("");
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
                        Faça login para iniciar sua sessão
                    </p>

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

                    <div className="d-flex justify-content-center">
                        <button
                            className="btn btn-primary w-100"
                            onClick={login}
                            disabled={isLoading}
                        >
                            {isLoading ? "Carregando..." : "Entrar"}
                        </button>
                    </div>
                </div>
                <ToastNotification />
            </div>
        </div>
    );
}
