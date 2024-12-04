"use client";
import { useContext, useEffect, useRef, useState } from "react";
import UserContext from "../../context/user.context";

import React from "react";
import HttpSocket from "@/app/http/http.socket";
import { useRouter } from "next/navigation";

export default function Home({ params }) {
    const socket = new HttpSocket();
    const { id } = React.use(params)
    const { user } = useContext(UserContext);
    const route = useRouter();
    let vez = 0

    if(user && vez == 0){
        socket.init(id, user);
        socket.emit('entrar');
        socket.on('RespostaEntrar',(dados)=>{
            if(dados.ok){
                
            }else{
                route.push('/sala')
            }
            console.log(dados);
        });
        vez = 1
    }

    useEffect(() => {
        
    }, [])



    return (
        <div>
            <h1>Local onde fica o jogo</h1>
        </div>
    );
}
