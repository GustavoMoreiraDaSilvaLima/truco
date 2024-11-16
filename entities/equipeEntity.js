import BaseEntity from './baseEntity.js';

export default class equipeEntity extends BaseEntity{
    #eqpId;
    #eqpDescricao;
  
    constructor(eqpId, eqpDescricao) {
      super();
      this.#eqpId = eqpId;
      this.#eqpDescricao = eqpDescricao;
    }
  
    get eqpId() {
      return this.#eqpId;
    }
  
    set eqpId(value) {
      this.#eqpId = value;
    }
  
    get eqpDescricao() {
      return this.#eqpDescricao;
    }
  
    set eqpDescricao(value) {
      this.#eqpDescricao = value;
    }
  }