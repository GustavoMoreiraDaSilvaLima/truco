import { Server } from 'socket.io';
import JogoController from '../controllers/jogoController.js';
import ParticipanteController from '../controllers/participanteController.js';
import participanteRepository from '../repositories/participanteRepository.js';
import participanteEntity from '../entities/participanteEntity.js';
import usuarioEntity from '../entities/usuarioEntity.js';
import salaEntity from '../entities/salaEntity.js';
import EquipeController from '../controllers/equipeController.js';

export default function socket(io) {
    try {
        const Participantes = new ParticipanteController();
        let jogoController = new JogoController();
        io.on('connection', (socket) => {
            let IdSala = socket.handshake.query.Sala;
            let IdUsuario = socket.handshake.query.Id;
            let NomeUsuario = socket.handshake.query.Nome;

            let objeto = {
                Sala: IdSala,
                IdUsuario: IdUsuario,
                Nome: NomeUsuario
            }


            socket.join(IdSala);
            socket.on('entrar', () => {
                if (IdSala && IdSala > 0 && IdUsuario && IdUsuario > 0) {
                    Participantes.ValidarParticipante(objeto)
                        .then((r) => {
                            if (r == 201) {
                                io.to(IdSala).emit('RespostaEntrar', { ok: true, Id: IdUsuario, Nome: NomeUsuario, msg: ' Entrou!' });
                            } else if(r == 200){
                                io.to(IdSala).emit('RespostaEntrar', { ok: true, Id: IdUsuario, Nome: NomeUsuario, msg: ' Reconectou' });
                            }else{
                                io.to(IdSala).emit('RespostaEntrar', { ok: false, Id: IdUsuario, Nome: NomeUsuario, msg: 'Sala cheia, não é possivel entrar!' });
                            }
                        }
                        )
                        .catch(e => console.log(e));

                }
            })
            socket.on('EntrarEquipe', (equipeId, salaId)=>{
                if (salaId && salaId > 0 && equipeId && equipeId > 0) {
                    //Adiocionar um participante a uma equipe é parte da Controller de equipe
                    let equipeControl = new EquipeController();
                }


            })
            socket.on('disconnect', () => {
                Participantes.RemoverParticipante(objeto).then(r => {
                    if(r){
                        io.to(IdSala).emit('RespostaSair', { ok: true, Id: IdUsuario, Nome: NomeUsuario, msg: ' Saiu!' });
                    }
                }).catch(e => {
                    console.log(e)
                });
            })

            console.log('Nome:', IdUsuario + ' ' + 'Sala:', IdSala);
        })
    } catch (error) {
        console.log(error.msg);
    }
}