"use client";
import { useContext, useEffect, useRef, useState } from "react";
import UserContext from "../../context/user.context";

import React from "react";
import HttpSocket from "@/app/http/http.socket";

export default function Home({ params }) {
    const socket = new HttpSocket();
    const { id } = React.use(params)
    const { user } = useContext(UserContext);

    console.log(user);
   
    console.log(id);
    useEffect(() => {
        if(user){
            console.log(user.usuId);
            socket.init(id, user.usuId); 
        }
    }, [])



    return (
        <div>
            <h1>Local onde fica o jogo</h1>
        </div>
    );
}
