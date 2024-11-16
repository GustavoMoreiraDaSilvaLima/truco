export default class HttpClient {

    constructor() {
        this.baseUrl = 'http://localhost:5000';
    }

    async get(url) {
        return fetch(this.baseUrl + url, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            },
        });
    }

    async post(url, data) {
        return fetch(this.baseUrl + url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data),
        });
    }

    async put(url, data) {
        return fetch(this.baseUrl + url, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data),
        });
    }

    async delete(url) {
        return fetch(this.baseUrl + url, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
            },
        });
    }
}