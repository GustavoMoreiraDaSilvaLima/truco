import { Server } from 'socket.io';
import JogoController from '../controllers/jogoController.js';

export default function socket(io){

    let jogoController = new JogoController();
    io.on('connection', socket => console.log(`socket conectado: ${socket.id}`));

}