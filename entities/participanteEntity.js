import BaseEntity from './baseEntity.js';

export default class usuario extends BaseEntity {
    #parId;
    #dtEntrada
    #dtSaida;
    #usuario;
    #sala;
    #equipe;

    constructor(parId, dtEntrada, dtSaida, usuario, sala, equipe) {
        this.#parId = parId;
        this.#dtEntrada = dtEntrada;
        this.#dtSaida = dtSaida;
        this.#usuario = usuario;
        this.#sala = sala;
        this.#equipe = equipe;
    }

    get parId() {
        return this.#parId;
    }

    set parId(value) {
        this.#parId = value;
    }

    get dtEntrada() {
        return this.#dtEntrada;
    }

    set dtEntrada(value) {
        this.#dtEntrada = value;
    }

    get dtSaida() {
        return this.#dtSaida;
    }

    set dtSaida(value) {
        this.#dtSaida = value;
    }

    get usuario() {
        return this.#usuario;
    }

    set usuario(value) {
        this.#usuario = value;
    }

    get sala() {
        return this.#sala;
    }

    set sala(value) {
        this.#sala = value;
    }

    get equipe() {
        return this.#equipe;
    }

    set equipe(value) {
        this.#equipe = value;
    }
}