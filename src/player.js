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

export class Computer extends Player {
  constructor(name) {
    super(name);
    this.placeAll();
  }

  placeAll() {
    this.gameboard.place(this.gameboard.getCarrier(), [0, 0], 'south');
    this.gameboard.place(this.gameboard.getBattleship(), [1, 0], 'south');
    this.gameboard.place(this.gameboard.getDestroyer(), [2, 0], 'south');
    this.gameboard.place(this.gameboard.getSubmarine(), [3, 0], 'south');
    this.gameboard.place(this.gameboard.getPatrol(), [4, 0], 'south');
  }

  attack() {
    const x = Math.floor(Math.random() * 10);
    const y = Math.floor(Math.random() * 10);
    return [x, y];
  }
}
