import HttpClient from "../http/http.client";

export default class LoginService {
    async login(email, senha) {
        try {
            if (email && senha) {
                let http = new HttpClient();
                let response = await http.post('/login', { email: email, senha: senha });
                if (response.status === 200) {
                    const usuario = response.json();
                    return usuario;
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

    async logout() {
        try {
            let http = new HttpClient();
            let response = await http.get('/login/logout');
            if(response.status === 200) {
                localStorage.removeItem('usuario');
                return response.json();
            }
            
            return false;
        } catch (e) {
            console.error(e);
        }
    }
}