import { io } from 'socket.io-client';

export default class HttpSocket{
    static Url = 'http://localhost:4000';
    constructor(){
       ;
    }

    init(sala, user){
        this.socket = io(HttpSocket.Url,{ query: "Sala="+sala+"&Id="+user.usuId+"&Nome="+user.usuNome});
    }

    on(event, callback) {
        if (this.socket) {
            this.socket.on(event, callback);
        } else {
            console.error("Socket não inicializado. Chame o método init primeiro.");
        }
    }

    // Método para emitir eventos
    emit(event, data) {
        if (this.socket) {
            this.socket.emit(event, data);
        } else {
            console.error("Socket não inicializado. Chame o método init primeiro.");
        }
    }

    // Método para remover ouvintes de eventos
    off(event, callback) {
        if (this.socket) {
            this.socket.off(event, callback);
        } else {
            console.error("Socket não inicializado. Chame o método init primeiro.");
        }
    }

    // Método para desconectar o socket
    disconnect() {
        if (this.socket) {
            this.socket.disconnect();
            this.socket = null; // Opcional: limpar a referência
        } else {
            console.log("Socket não inicializado. Chame o método init primeiro.");
        }
    }

}