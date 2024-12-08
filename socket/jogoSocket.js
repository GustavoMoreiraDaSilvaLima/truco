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

            //Socket para linkar a sala com as requisições
            socket.join(IdSala);
            //Socket para entrar na sala emite uma resposta de retorno
            socket.on('entrar', () => {
                if (IdSala && IdSala > 0 && IdUsuario && IdUsuario > 0) {
                    Participantes.ValidarParticipante(objeto)
                        .then((r) => {
                            if (r == 201) {
                                io.to(IdSala).emit('RespostaEntrar', { ok: true, Id: IdUsuario, Nome: NomeUsuario, msg: ' Entrou!' });
                            } else if (r == 200) {
                                io.to(IdSala).emit('RespostaEntrar', { ok: true, Id: IdUsuario, Nome: NomeUsuario, msg: ' Reconectou' });
                            } else {
                                io.to(IdSala).emit('RespostaEntrar', { ok: false, Id: IdUsuario, Nome: NomeUsuario, msg: 'Sala cheia, não é possivel entrar!' });
                            }
                        }
                        )
                        .catch(e => console.log(e));

                }
            })
            //Socket para entrar na equipe, utiliza a controller e entra na equipe, tem resposta de retorno
            socket.on('EntrarEquipe', (equipeId) => {
                if (equipeId.equipeId > 0) {
                    //Adiocionar um participante a uma equipe é parte da Controller de equipe
                    let equipeControl = new EquipeController();
                    equipeControl.adicionarParticipanteEquipe(objeto, equipeId.equipeId)
                        .then((r) => {
                            if (r.status == 201) {
                                //Emite a resposta de retorno
                                io.to(IdSala).emit('RespostaEntrarEquipe', { ok: true, Id: IdUsuario, Nome: NomeUsuario, msg: `Entrou na equipe ${r.equipe}!` });
                            } else {
                                io.to(IdSala).emit('RespostaEntrarEquipe', { ok: false, Id: IdUsuario, Nome: NomeUsuario, msg: 'Ocorreu um erro interno' });
                            }
                        })
                }
            })
            //Fazer o envio de mensagem no chat!
            socket.on('EnviarMensagem', (msg) => {
                if (msg && msg.mensagem && msg.mensagem.length > 0) {
                    io.to(IdSala).emit('EnviarMensagem', { Id: IdUsuario, Nome: NomeUsuario, msg: msg.mensagem, ok:true });
                }
            })
            //Socket para o usuário confirmar se está pronto
            socket.on('Pronto', (requisicao) => {
                let participanteControl = new ParticipanteController();
                participanteControl.Preparando(objeto, requisicao.atributo)
                .then(r =>{
                    if(r.status == 200){
                        io.to(IdSala).emit('JogadorPronto', { Id: IdUsuario, Nome: NomeUsuario, msg: `${NomeUsuario} ${requisicao.atributo == true? 'está pronto':'não está pronto'}`, ok:true });
                        if(r.jogoPronto){
                            io.to(IdSala).emit('JogoPronto', { ok: true });
                        }
                        
                    }else{
                        io.to(IdSala).emit('JogadorPronto', { ok: false, Id: IdUsuario, Nome: NomeUsuario, msg: 'Ocorreu um erro interno' });
                    }
                }).catch(e => {
                    console.log(e)
                });
            })

            //Socket quando o usuário é desconectado!
            socket.on('disconnect', () => {
                console.log('Disconnect')
                
                Participantes.RemoverParticipante(objeto).then(r => {
                    if (r) {
                        io.to(IdSala).emit('RespostaSair', { ok: true, Id: IdUsuario, Nome: NomeUsuario, msg: ' Saiu!' });
                    }
                }).catch(e => {
                    console.log(e)
                });
            })
        })
    } catch (error) {
        console.log(error.msg);
    }
}