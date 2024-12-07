'use client';

import { useEffect, useRef } from "react";

export default function Chat({ dados }) {

    const lastMessageRef = useRef(null);

    useEffect(() => {
        if (lastMessageRef.current) {
            lastMessageRef.current.scrollIntoView({ behavior: 'smooth' });
        }
    }, [dados]);

    console.log(dados);
    return (
        <div className="border border-secondary rounded border-opacity-25" style={{ height: "300px", overflowY: "auto"}}>
            <div className="pt-3 pb-1">
                {dados.map((value, index) => (
                    <p className='px-3 text-start' key={index}>{value}</p>
                ))}
                 <div ref={lastMessageRef}></div>
            </div>
        </div>
    );
}