import BaseEntity from './baseEntity.js';

export default class JogoEntity extends BaseEntity {
    #jogId;
    #jogDtinicio;
    #jogDtfim;
    #sala;

    constructor(jogId, jogDtinicio, jogDtfim, sala) {
        super();
        this.#jogId = jogId;
        this.#jogDtinicio = jogDtinicio;
        this.#jogDtfim = jogDtfim;
        this.#sala = sala;
    }

    get jogId() {
        return this.#jogId;
    }

    set jogId(value) {
        this.#jogId = value;
    }

    get jogDtinicio() {
        return this.#jogDtinicio;
    }

    set jogDtinicio(value) {
        this.#jogDtinicio = value;
    }

    get jogDtfim() {
        return this.#jogDtfim;
    }

    set jogDtfim(value) {
        this.#jogDtfim = value;
    }

    get sala() {
        return this.#sala;
    }

    set sala(value) {
        this.#sala = value;
    }
}