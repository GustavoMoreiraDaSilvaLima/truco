import Cookies from 'js-cookie';
import HttpClient from '../http/http.client';

export default class ParticipanteService {


    async ListarParticipantesSala(sala){
        try {
            let http = new HttpClient();
            let response = await http.get(`/participante/sala/${sala}`);
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