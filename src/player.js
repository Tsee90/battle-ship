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
  }

  placeAll() {
    this.placeRandom(this.gameboard.getCarrier());
    this.placeRandom(this.gameboard.getBattleship());
    this.placeRandom(this.gameboard.getDestroyer());
    this.placeRandom(this.gameboard.getSubmarine());
    this.placeRandom(this.gameboard.getPatrol());
  }

  placeRandom(ship) {
    let placement = this.gameboard.place(
      ship,
      this.randomCoordinate(),
      this.randomOrientation()
    );
    while (placement === null) {
      placement = this.gameboard.place(
        ship,
        this.randomCoordinate(),
        this.randomOrientation()
      );
    }
  }

  randomCoordinate() {
    const x = Math.floor(Math.random() * 10);
    const y = Math.floor(Math.random() * 10);
    return [x, y];
  }

  randomOrientation() {
    const list = ['north', 'south', 'east', 'west'];
    const randomNum = Math.floor(Math.random() * 5);
    return list[randomNum];
  }

  attack() {
    const x = Math.floor(Math.random() * 10);
    const y = Math.floor(Math.random() * 10);
    return [x, y];
  }
}
