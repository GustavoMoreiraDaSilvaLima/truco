import BaseEntity from './baseEntity.js';

export default class sala extends BaseEntity {
    #jogId;
    #jogDtinicio;
    #jogDtfim;
    #salId;

    constructor(jogId, jogDtinicio, jogDtfim, salId) {
        this.#jogId = jogId;
        this.#jogDtinicio = jogDtinicio;
        this.#jogDtfim = jogDtfim;
        this.#salId = salId;
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

    get salId() {
        return this.#salId;
    }

    set salId(value) {
        this.#salId = value;
    }
}