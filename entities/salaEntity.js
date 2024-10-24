import BaseEntity from './baseEntity.js';

export default class sala extends BaseEntity {
    #salId;
    #salNome;
    #usuId;

    constructor(salId, salNome, usuId) {
        this.#salId = salId;
        this.#salNome = salNome;
        this.#usuId = usuId;
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

    get usuId() {
        return this.#usuId;
    }

    set usuId(value) {
        this.#usuId = value;
    }
}