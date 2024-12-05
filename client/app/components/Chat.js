'use client';
export default function Chat({ dados }) {

    console.log(dados);
    return (
        <div>
            {dados.map((value, index) => (
                <p key={index}>{value}</p> 
            ))}
        </div>
    );
}