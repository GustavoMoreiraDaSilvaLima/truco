import BaseEntity from './baseEntity.js';

export default class usuario extends BaseEntity {
    #parId;
    #parDentradaparDtsaida;
    #usuId;
    #salId;
    #eqpId;

    constructor(parId, parDentradaparDtsaida, usuId, salId, eqpId) {
        this.#parId = parId;
        this.#parDentradaparDtsaida = parDentradaparDtsaida;
        this.#usuId = usuId;
        this.#salId = salId;
        this.#eqpId = eqpId;
    }

    get parId() {
        return this.#parId;
    }

    set parId(value) {
        this.#parId = value;
    }

    get parDentradaparDtsaida() {
        return this.#parDentradaparDtsaida;
    }

    set parDentradaparDtsaida(value) {
        this.#parDentradaparDtsaida = value;
    }

    get usuId() {
        return this.#usuId;
    }

    set usuId(value) {
        this.#usuId = value;
    }

    get salId() {
        return this.#salId;
    }

    set salId(value) {
        this.#salId = value;
    }

    get eqpId() {
        return this.#eqpId;
    }

    set eqpId(value) {
        this.#eqpId = value;
    }
}