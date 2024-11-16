import HttpClient from '@/app/http/http.client';

export default class CadastrarService{
    async cadastrar(nome, email, senha) {
        try {
            if (nome && email && senha) {
                let http = new HttpClient();
                let response = await http.post('/usuarios', { nome: nome, email: email, senha: senha });
                if (response.status === 200 || response.status === 201) {
                    return true;
                } else {
                    return false;
                }
            } else {
                return false;
            }
        } catch (e) {
            console.error(e);
        }
    }
}