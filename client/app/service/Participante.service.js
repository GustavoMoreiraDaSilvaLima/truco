import Cookies from 'js-cookie';
import HttpClient from '../http/http.client';

export default class ParticipanteService {


    async ListarParticipantesSala(sala) {
        try {
            let http = new HttpClient();
            let response = await http.get(`/participante/sala/${sala}`);
            if (response.status === 200 ) {
                return response.json();
            } else {
                return false;
            }
        } catch (e) {
            console.error(e);
        }
    }

    async PegarCartas(sala, usuario, jogo) {
        try {
            let http = new HttpClient();
            let response = await http.get(`/carta/participante/sala/${sala}/usuario/${usuario}/jogo/${jogo}`);
            if (response.status === 200|| response.status === 201) {
                return response.json();
            } else {
                return false;
            }
        } catch (e) {
            console.error(e);
        }
    }

    async PegarCarasNovas(usuario, sala, jogo, rodada){
        try {
            let http = new HttpClient();
            let response = await http.get(`/carta/novas/sala/${sala}/usuario/${usuario}/jogo/${jogo}/rodada/${rodada}`);
            if (response.status === 200|| response.status === 201) {
                return response.json();
            } else {
                return false;
            }
        } catch (e) {
            console.error(e);
        }
    }
}