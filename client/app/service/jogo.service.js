import Cookies from 'js-cookie';
import HttpClient from '../http/http.client';

export default class JogoService {


    async JogarCarta(carta, jogo, participante, rodada) {
        try {
            let http = new HttpClient();
            let response = await http.post(`/jogo/sala/rodada`, { carta: carta, jogo: jogo, participante: participante, rodada: rodada });
            if (response.status === 200) {
                return { status: 200, r: await response.json() };
            } else if (response.status === 400) {
                return { status: 400, r: await response.json() };
            } else if (response.status === 500) {
                return { status: 500, r: await response.json() };
            }else{
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
            if (response.status === 200 || response.status === 201) {
                return response.json();
            } else {
                return false;
            }
        } catch (e) {
            console.error(e);
        }
    }
}