import { Server } from 'socket.io';
import JogoController from '../controllers/jogoController.js';

export default function socket(io) {

    let jogoController = new JogoController();
    io.on('connection', (socket) => {
        let Sala = socket.handshake.query.Sala;
        let Nome = socket.handshake.query.Nome;
        
    })
}