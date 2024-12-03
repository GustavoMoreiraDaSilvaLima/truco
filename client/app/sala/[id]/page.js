"use client";
import { useContext, useEffect, useRef, useState } from "react";
import UserContext from "../../context/user.context";
import { io } from 'socket.io-client';
import React from "react";

export default function Home({ params }) {
    const socket = io('http://localhost:4000');
    const { id } = React.use(params)
    const { user } = useContext(UserContext);


    console.log(id);
    useEffect(() => {
    }, [])



    return (
        <div>
            <h1>Local onde fica o jogo</h1>
        </div>
    );
}
