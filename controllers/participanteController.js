import equipeEntity from '../entities/equipeEntity.js';
import salaEntity from '../entities/salaEntity.js';
import usuarioEntity from '../entities/usuarioEntity.js';
import participanteEntity from '../entities/participanteEntity.js';
import participanteRepository from '../repositories/participanteRepository.js';

export default class ParticipanteController {

    async listar(req, res) {
        try {
            let participante = new participanteRepository();
            let lista = await participante.listar();
            res.status(200).json(lista);
        } catch (ex) {
            res.status(500).json({ erro: ex.message });
        }
    }

    async obter(req, res) {
        try {
            let id = req.params.id;
            let participante = new participanteRepository();
            let entidade = await participante.obter(id);
            if (entidade) {
                res.status(200).json(entidade);
            } else {
                res.status(404).json({ erro: "participante não encontrada" });
            }
        } catch (ex) {
            res.status(500).json({ erro: ex.message });
        }
    }

    async gravar(req, res) {
        try {
            let { dtEntrada, dtSaida, sala, equipe, usuario } = req.body;
            if (sala && sala.salId > 0 && equipe && equipe.eqpId > 0 && usuario && usuario.usuId > 0) {
                let entidade = new participanteEntity(0, dtEntrada, dtSaida, new usuarioEntity(usuario.usuId), new salaEntity(sala.salId), new equipeEntity(equipe.eqpId));

                let repo = new participanteRepository();
                let result = await repo.gravar(entidade);
                if (result) {
                    res.status(201).json({ msg: "participante criada com sucesso" });
                } else {
                    throw new Error({ msg: "Erro ao criar participante" });
                }
            } else {
                res.status(400).json({ msg: "Dados inválidos" });
            }

        } catch (ex) {
            res.status(500).json({ erro: ex.message });
        }
    }

    async alterar(req, res) {
        try {
            let { parId, dtEntrada, dtSaida, sala, equipe, usuario } = req.body;
            if (parId && dtEntrada && dtSaida && sala && sala && sala.salId > 0 && equipe && equipe.eqpId > 0 && usuario && usuario.usuId > 0) {
                let entidade = new participanteEntity(parId, dtEntrada, dtSaida, new usuarioEntity(usuario.usuId), new salaEntity(sala.salId), new equipeEntity(equipe.eqpId));
                let repo = new participanteRepository();
                if (await repo.obter(parId)) {
                    let result = await repo.alterar(entidade);

                    if (result) {
                        res.status(200).json({ msg: "Alteração feita com sucesso!" });
                    } else {
                        throw new Error({ msg: "Erro ao alterar participante" });
                    }
                } else {
                    res.status(404).json({ msg: "participante não encontrada para alteração" });
                }

            } else {
                res.status(400).json({ msg: "Dados inválidos" });
            }
        } catch (ex) {
            res.status(500).json({ erro: ex.message });
        }
    }

    async alterarParcialmente(req, res) {
        try {
            let { parId, dtEntrada, dtSaida, sala, equipe, usuario } = req.body;

            if (parId && (dtEntrada || dtSaida || (sala && sala.salId > 0) || (equipe && equipe.eqpId > 0) || (usuario && usuario.usuId > 0))) {
                let participanteEntidade = new participanteEntity(parId, dtEntrada, dtSaida);

                if (sala && sala.salId > 0) {
                    participanteEntidade.sala = new salaEntity(sala.salId);
                }
                if (equipe && equipe.eqpId > 0) {
                    participanteEntidade.equipe = new equipeEntity(equipe.eqpId);
                }
                if (usuario && usuario.usuId > 0) {
                    participanteEntidade.usuario = new usuarioEntity(usuario.usuId);
                }

                let participanteRepo = new participanteRepository();
                let result = await participanteRepo.alterarParcialmente(participanteEntidade);

                if (result == false) {
                    throw new Error("Erro ao alterar participante no banco de dados");
                }

                res.status(200).json({ msg: "Alteração parcial realizada com sucesso" })
            }
        } catch (ex) {
            res.status(500).json({ erro: ex.message });
        }
    }

    async deletar(req, res) {
        try {
            let { id } = req.params;
            let participante = new participanteRepository();
            if (await participante.obter(id)) {
                let result = await participante.delete(id);
                if (result) {
                    res.status(200).json({ msg: "participante excluído(a) com sucesso" });
                } else {
                    throw new Error({ msg: "participante não encontrada para exclusão" });
                };
            } else {
                res.status(404).json({ msg: "participante não encontrada para exclusão" });
            }
        } catch (ex) {
            res.status(500).json({ msg: ex.message });
        }
    }

    async ValidarParticipante(Objeto){
        try{
            let participante = new participanteRepository();
            let result = await participante.obterQuantidadePorSala(Objeto.Sala);
            if(result< 4){
                let participanteEntidade = new participanteEntity(0,0,0, new usuarioEntity(Objeto.IdUsuario), new salaEntity(Objeto.Sala),0);
                let result = await participante.gravar(participanteEntidade);
                if(result){
                    return true;
                }else{
                    return false;
                }
            }
        }catch(error){
            console.log(error.msg);
            return false;
        }
    }
}