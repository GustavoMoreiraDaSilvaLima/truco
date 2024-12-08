import BaseEntity from './baseEntity.js';

export default class participanteEntity extends BaseEntity {
    #parId;
    #dtEntrada
    #dtSaida;
    #usuario;
    #sala;
    #equipe;
    #pronto

    constructor(parId, dtEntrada, dtSaida, usuario, sala, equipe, pronto) {
        super();
        this.#parId = parId;
        this.#dtEntrada = dtEntrada;
        this.#dtSaida = dtSaida;
        this.#usuario = usuario;
        this.#sala = sala;
        this.#equipe = equipe;
        this.#pronto = pronto;
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

    get pronto() {
        return this.#pronto;
    }

    set pronto(value) {
        this.#pronto = value;
    }
}