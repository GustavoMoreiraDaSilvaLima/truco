import BaseEntity from "./baseEntity";

export default class rodada extends BaseEntity {
    #rodId;
    #maoId;
    #eqpVencedora;

    constructor(rodId, maoId, eqpVencedora) {
        this.#rodId = rodId;
        this.#maoId = maoId;
        this.#eqpVencedora = eqpVencedora;
    }

    get rodId() {
        return this.#rodId;
    }

    set rodId(value) {
        this.#rodId = value;
    }

    get maoId() {
        return this.#maoId;
    }

    set maoId(value) {
        this.#maoId = value;
    }

    get eqpVencedora() {
        return this.#eqpVencedora;
    }

    set eqpVencedora(value) {
        this.#eqpVencedora = value;
    }
}