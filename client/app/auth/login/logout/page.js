'use client'
import Loading from "@/app/components/loading";
import LoginService from "@/app/service/login.service";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { showErrorToast } from "@/app/components/toasts";


export default function Logout() {

    const router = useRouter();

    async function logout() {
        let sLogin = new LoginService();
        const salaCriada = await sLogin.logout();
        if (salaCriada) {
            router.push("/auth/login");
        } else {
            showErrorToast("Erro ao sair");
            router.push("/");
        }
    }
    useEffect(() => {
        setTimeout(()=>{
            logout();
        },1500);
    }, [])

    return (
        <div style={{display:"flex", flexDirection:"column", alignItems:"center", height:"100vh", justifyContent:"Center"}}>
            <Loading></Loading>
            <h2>Aguarde, deslogando o seu usuário</h2>
        </div>
    )
}