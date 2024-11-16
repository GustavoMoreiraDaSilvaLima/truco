import BaseEntity from "./baseEntity.js";

export default class carta extends BaseEntity {
    #carId;
    #carCodigo;
    #carImagem;
    #carValor;
    #carNaipe;
    #carVira;
    #participante;
    #mao;

    constructor(carId, carCodigo, carImagem, carValor, carNaipe, carVira, participante, mao) {
        this.#carId = carId;
        this.#carCodigo = carCodigo;
        this.#carImagem = carImagem;
        this.#carValor = carValor;
        this.#carNaipe = carNaipe;
        this.#carVira = carVira;
        this.#participante = participante;
        this.#mao = mao;
    }

    get carId() {
        return this.#carId;
    }

    set carId(value) {
        this.#carId = value;
    }

    get carCodigo() {
        return this.#carCodigo;
    }

    set carCodigo(value) {
        this.#carCodigo = value;
    }

    get carImagem() {
        return this.#carImagem;
    }

    set carImagem(value) {
        this.#carImagem = value;
    }

    get carValor() {
        return this.#carValor;
    }

    set carValor(value) {
        this.#carValor = value;
    }

    get carNaipe() {
        return this.#carNaipe;
    }

    set carNaipe(value) {
        this.#carNaipe = value;
    }

    get carVira() {
        return this.#carVira;
    }

    set carVira(value) {
        this.#carVira = value;
    }

    get participante() {
        return this.#participante;
    }

    set participante(value) {
        this.#participante = value;
    }

    get mao() {
        return this.#mao;
    }

    set mao(value) {
        this.#mao = value;
    }
}