import BaseEntity from "./baseEntity.js";

export default class movimentacao extends BaseEntity {
    #movId;
    #movOrdem;
    #movCorreu;
    #movTrucou;
    #carta;
    #rodada;
    #participante;

    constructor(movId, movOrdem, movCorreu, movTrucou, carta, rodada, participante) {
        this.#movId = movId;
        this.#movOrdem = movOrdem;
        this.#movCorreu = movCorreu;
        this.#movTrucou = movTrucou;
        this.#carta = carta;
        this.#rodada = rodada;
        this.#participante = participante;
    }

    get movId() {
        return this.#movId;
    }

    set movId(value) {
        this.#movId = value;
    }

    get movOrdem() {
        return this.#movOrdem;
    }

    set movOrdem(value) {
        this.#movOrdem = value;
    }

    get movCorreu() {
        return this.#movCorreu;
    }

    set movCorreu(value) {
        this.#movCorreu = value;
    }

    get movTrucou() {
        return this.#movTrucou;
    }

    set movTrucou(value) {
        this.#movTrucou = value;
    }

    get carta() {
        return this.#carta;
    }

    set carta(value) {
        this.#carta = value;
    }

    get rodada() {
        return this.#rodada;
    }

    set rodada(value) {
        this.#rodada = value;
    }

    get participante() {
        return this.#participante;
    }

    set participante(value) {
        this.#participante = value;
    }
}