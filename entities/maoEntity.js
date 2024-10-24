import BaseEntity from "./baseEntity";

export default class mao extends BaseEntity {
    #maoId;
    #maoOrdem;
    #maoCodigo;
    #baralho;
    #maoTrucada;
    #maoValor;
    #jogId;
    #eqpVencedora;

    constructor(maoId, maoOrdem, maoCodigo, baralho, maoTrucada, maoValor, jogId, eqpVencedora) {
        this.#maoId = maoId;
        this.#maoOrdem = maoOrdem;
        this.#maoCodigo = maoCodigo;
        this.#baralho = baralho;
        this.#maoTrucada = maoTrucada;
        this.#maoValor = maoValor;
        this.#jogId = jogId;
        this.#eqpVencedora = eqpVencedora;
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

    get maoCodigo() {
        return this.#maoCodigo;
    }

    set maoCodigo(value) {
        this.#maoCodigo = value;
    }

    get baralho() {
        return this.#baralho;
    }

    set baralho(value) {
        this.#baralho = value;
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

    get jogId() {
        return this.#jogId;
    }

    set jogId(value) {
        this.#jogId = value;
    }

    get eqpVencedora() {
        return this.#eqpVencedora;
    }

    set eqpVencedora(value) {
        this.#eqpVencedora = value;
    }
}