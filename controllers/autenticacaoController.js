import authMiddleware from "../middlewares/authMidleware.js";
// import UsuarioModel from "../models/usuarioModel.js"
import UsuarioRepository from "../repositories/usuarioRepository.js";


export default class AutenticacaoController {

    async token(req, res) {
        try {
            const { email, senha } = req.body
            if (email && senha) {
                const repo = new UsuarioRepository();
                let usuario = await repo.validarAcesso(email, senha);
                if (usuario) {
                    const auth = new authMiddleware();
                    let token = auth.gerarToken(usuario.usuId,usuario.usuNome, usuario.usuEmail);
                    res.cookie("token", token, {
                        httpOnly: true
                    })
                    res.status(200).json({token: token})
                    //Cookie não pode ser alterada pelo cliente quando está httpOnly
                } else {
                    res.status(404).json({ msg: "Credenciais inválidas" })
                }

            } else {
                res.status(400).json({ msg: "As credenciais não foram fornecidas corretamente!" })
            }


        } catch (error) {
            res.status(500).json({ msg: error.message })
        }
    }
}