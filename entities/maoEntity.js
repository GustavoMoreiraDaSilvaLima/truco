import BaseEntity from "./baseEntity.js";

export default class maoEntityEntity extends BaseEntity {
    #maoId;
    #maoOrdem;
    #maoCodigoBaralho;
    #maoTrucada;
    #maoValor;
    #jogo;
    #equipe;

    constructor(maoId, maoOrdem, maoCodigoBaralho, maoTrucada, maoValor, jogo, equipe) {
        super();
        this.#maoId = maoId;
        this.#maoOrdem = maoOrdem;
        this.#maoCodigoBaralho = maoCodigoBaralho;
        this.#maoTrucada = maoTrucada;
        this.#maoValor = maoValor;
        this.#jogo = jogo;
        this.#equipe = equipe;
    }

    get maoId() {
        return this.#maoId;
    }

    set maoId(value) {
        this.#maoId = value;
    }

    get maoOrdem() {
        return this.#maoOrdem;
    }

    set maoOrdem(value) {
        this.#maoOrdem = value;
    }

    get maoCodigoBaralho() {
        return this.#maoCodigoBaralho;
    }

    set maoCodigoBaralho(value) {
        this.#maoCodigoBaralho = value;
    }

    get maoTrucada() {
        return this.#maoTrucada;
    }

    set maoTrucada(value) {
        this.#maoTrucada = value;
    }

    get maoValor() {
        return this.#maoValor;
    }

    set maoValor(value) {
        this.#maoValor = value;
    }

    get jogo() {
        return this.#jogo;
    }

    set jogo(value) {
        this.#jogo = value;
    }

    get equipe() {
        return this.#equipe;
    }

    set equipe(value) {
        this.#equipe = value;
    }
}