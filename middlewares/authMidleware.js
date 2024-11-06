import jwt from 'jsonwebtoken';
import UsuarioRepository from '../repositories/usuarioRepository.js';
const CHAVE = "TrucaFofoVai";

export default class authMiddleware {
    gerarToken(id, nome, email) {
        return jwt.sign({
            id: id,
            nome: nome,
            email: email
        }, CHAVE, { expiresIn: 360 });
    }

    async validar(req, res, next) {
        let { token } = req.cookies;
        if (token) {
            try {
                const ident_user = jwt.verify(token, CHAVE);
                const repository = new UsuarioRepository();
                const usuario = await repository.obter(ident_user.id);
                if(usuario){    
                    //Renovar autenticação
                    const auth = new authMiddleware();
                    const tokenNovo = auth.gerarToken(usuario.usuId, usuario.usuNome, usuario.usuEmail);
                    res.cookie("token", tokenNovo,{
                        httpOnly: true
                    });
                    //Caso precise dele logado
                    req.usuario = usuario;
                    next();

                }else{
                    //Usuario não encontrado
                    res.status(401).json({ msg: "Não autorizado" })
                }
            } catch(Erro) {
                res.status(401).json({ msg: "Não autorizado" })
            }
        } else {

        }
    }
}