import BaseEntity from "./baseEntity";

export default class movimentacao extends BaseEntity {
    #movId;
    #movOrdem;
    #movCorreu;
    #movTrucou;
    #carId;
    #rodId;
    #parId;

    constructor(movId, movOrdem, movCorreu, movTrucou, carId, rodId, parId) {
        this.#movId = movId;
        this.#movOrdem = movOrdem;
        this.#movCorreu = movCorreu;
        this.#movTrucou = movTrucou;
        this.#carId = carId;
        this.#rodId = rodId;
        this.#parId = parId;
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

    get carId() {
        return this.#carId;
    }

    set carId(value) {
        this.#carId = value;
    }

    get rodId() {
        return this.#rodId;
    }

    set rodId(value) {
        this.#rodId = value;
    }

    get parId() {
        return this.#parId;
    }

    set parId(value) {
        this.#parId = value;
    }
}