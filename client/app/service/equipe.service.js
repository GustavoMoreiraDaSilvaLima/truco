import Cookies from 'js-cookie';
import HttpClient from '../http/http.client';

export default class EquipeService {
    async ListarEquipe() {
        try {
            let http = new HttpClient();
            let response = await http.get('/equipe');
            if (response.status === 200) {
                return response.json();
            } else {
                return false;
            }
        } catch (e) {
            console.error(e);
        }
    }
}