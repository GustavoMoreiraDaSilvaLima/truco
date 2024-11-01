import BaseEntity from './baseEntity.js';

export default class sala extends BaseEntity {
    #salId;
    #salNome;
    #usuario;

    constructor(salId, salNome, usuario) {
        this.#salId = salId;
        this.#salNome = salNome;
        this.#usuario = usuario;
    }

    get salId() {
        return this.#salId;
    }

    set salId(value) {
        this.#salId = value;
    }

    get salNome() {
        return this.#salNome;
    }

    set salNome(value) {
        this.#salNome = value;
    }

    get usuario() {
        return this.#usuario;
    }

    set usuario(value) {
        this.#usuario = value;
    }
}