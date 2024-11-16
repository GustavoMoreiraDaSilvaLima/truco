import BaseEntity from "./baseEntity.js";

export default class rodadaEntity extends BaseEntity {
    #rodId;
    #mao;
    #equipe;

    constructor(rodId, mao, equipe) {
        super();
        this.#rodId = rodId;
        this.#mao = mao;
        this.#equipe = equipe;
    }

    get rodId() {
        return this.#rodId;
    }

    set rodId(value) {
        this.#rodId = value;
    }

    get mao() {
        return this.#mao;
    }

    set mao(value) {
        this.#mao = value;
    }

    get equipe() {
        return this.#equipe;
    }

    set equipe(value) {
        this.#equipe = value;
    }
}