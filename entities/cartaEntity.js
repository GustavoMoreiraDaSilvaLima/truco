import BaseEntity from "./baseEntity";

export default class carta extends BaseEntity {
    #carId;
    #carCodigo;
    #carImagem;
    #carValor;
    #carNaipe;
    #carVira;
    #parId;
    #maoId;

    constructor(carId, carCodigo, carImagem, carValor, carNaipe, carVira, parId, maoId) {
        this.#carId = carId;
        this.#carCodigo = carCodigo;
        this.#carImagem = carImagem;
        this.#carValor = carValor;
        this.#carNaipe = carNaipe;
        this.#carVira = carVira;
        this.#parId = parId;
        this.#maoId = maoId;
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

    get parId() {
        return this.#parId;
    }

    set parId(value) {
        this.#parId = value;
    }

    get maoId() {
        return this.#maoId;
    }

    set maoId(value) {
        this.#maoId = value;
    }
}