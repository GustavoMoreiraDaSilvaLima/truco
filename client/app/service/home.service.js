import HttpClient from '../http/http.client';

export default class HomeService {
    async salas() {
        try {
            let http = new HttpClient();
            let response = await http.get('/salas');
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