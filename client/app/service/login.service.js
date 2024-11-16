import HttpClient from "../http/http.client";

export default class LoginSerive {
    async login(email, senha) {
        try {
            if (email && senha) {
                let http = new HttpClient();
                let response = await http.post('/login', { email: email, senha: senha });
                console.log(response);
            } else {
                return false;
            }
        } catch (e) {
            console.error(e);
        }
    }
}