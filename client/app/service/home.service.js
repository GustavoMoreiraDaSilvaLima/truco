import Cookies from 'js-cookie';
import HttpClient from '../http/http.client';

export default class HomeService {
    async salas() {
        try {
            let http = new HttpClient();
            let response = await http.get('/sala');
            if (response.status === 200) {
                return response.json();
            } else {
                return false;
            }
        } catch (e) {
            console.error(e);
        }
    }

    async criarSala(nome, id) {
        try {
            let http = new HttpClient();
            let response = await http.post('/sala', { nome: nome, usuario: { id: id } });
            if (response.status === 201) {
                return response.json();
            } else {
                return false;
            }
        } catch (e) {
            console.error(e);
        }
    }


}