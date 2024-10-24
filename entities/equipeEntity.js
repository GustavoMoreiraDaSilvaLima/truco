import BaseEntity from './baseEntity.js';

export default class equipe extends BaseEntity{
    #eqpId;
    #eqpDescricao;
  
    constructor(eqpId, eqpDescricao) {
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