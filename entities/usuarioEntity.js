import BaseEntity from './baseEntity.js';

export default class usuario extends BaseEntity {
    #usuId;
    #usuNome;
    #usuEmail;
    #usuSenha;
  
    constructor(usuId, usuNome, usuEmail, usuSenha) {
      this.#usuId = usuId;
      this.#usuNome = usuNome;
      this.#usuEmail = usuEmail;
      this.#usuSenha = usuSenha;
    }
  
    get usuId() {
      return this.#usuId;
    }
  
    set usuId(value) {
      this.#usuId = value;
    }
  
    get usuNome() {
      return this.#usuNome;
    }
  
    set usuNome(value) {
      this.#usuNome = value;
    }
  
    get usuEmail() {
      return this.#usuEmail;
    }
  
    set usuEmail(value) {
      this.#usuEmail = value;
    }
  
    get usuSenha() {
      return this.#usuSenha;
    }
  
    set usuSenha(value) {
      this.#usuSenha = value;
    }
  }