import { io } from 'socket.io-client';

export default class HttpSocket{
    static Url = 'http://localhost:4000';
    constructor(){
       ;
    }

    init(sala, nome){
        console.log(nome);
        this.socket = io(HttpSocket.Url,{query: "Sala="+sala+"&Nome="+nome});
    }

}