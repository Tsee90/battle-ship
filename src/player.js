import { Gameboard } from './gameboard.js';

export class Player {
  constructor(name) {
    this.name = name;
    this.gameboard = new Gameboard();
  }

  getGameboard() {
    return this.gameboard;
  }

  getName() {
    return this.name;
  }

  setName(name) {
    this.name = name;
  }
}
