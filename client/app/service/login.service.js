import HttpClient from "../http/http.client";

export default class LoginService {
    async login(email, senha) {
        try {
            if (email && senha) {
                let http = new HttpClient();
                let response = await http.post('/login', { email: email, senha: senha });
                if (response.status === 200) {
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