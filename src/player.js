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
    this.hits = [];
    this.shots = [];
    this.allHits = [];
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

  smartCoordinate() {
    let start = 0;
    let coordinate = null;

    outterLoop: for (let y = 0; y < 10; y++) {
      start = start === 1 ? 0 : 1;
      for (let x = start; x < 10; x += 2) {
        if (this.checkAround([x, y]) && !this.isShot([x, y])) {
          coordinate = [x, y];
          break outterLoop;
        }
      }
    }
    return coordinate;
  }

  randomCoordinate() {
    let attack = [];
    while (attack.length === 0) {
      attack[0] = Math.floor(Math.random() * 10);
      attack[1] = Math.floor(Math.random() * 10);
      if (this.isShot(attack)) {
        attack = [];
      }
    }
    return attack;
  }

  randomOrientation() {
    const list = ['north', 'south', 'east', 'west'];
    const randomNum = Math.floor(Math.random() * 5);
    return list[randomNum];
  }

  isShot(coordinate) {
    for (const shot of this.shots) {
      if (shot[0] === coordinate[0] && shot[1] === coordinate[1]) return true;
    }
    return false;
  }

  checkNorth(coordinate) {
    const north = [coordinate[0], coordinate[1] - 1];
    if (this.gameboard.isValidCooridinate(north) && !this.isShot(north))
      return north;
    return null;
  }

  checkSouth(coordinate) {
    const south = [coordinate[0], coordinate[1] + 1];
    if (this.gameboard.isValidCooridinate(south) && !this.isShot(south))
      return south;
    return null;
  }

  checkEast(coordinate) {
    const east = [coordinate[0] + 1, coordinate[1]];
    if (this.gameboard.isValidCooridinate(east) && !this.isShot(east))
      return east;
    return null;
  }

  checkWest(coordinate) {
    const west = [coordinate[0] - 1, coordinate[1]];
    if (this.gameboard.isValidCooridinate(west) && !this.isShot(west))
      return west;
    return null;
  }

  checkAround(coordinate) {
    const north = [coordinate[0], coordinate[1] - 1];
    const south = [coordinate[0], coordinate[1] + 1];
    const east = [coordinate[0] + 1, coordinate[1]];
    const west = [coordinate[0] - 1, coordinate[1]];

    if (this.gameboard.isValidCooridinate(north) && !this.isShot(north))
      return north;
    if (this.gameboard.isValidCooridinate(south) && !this.isShot(south))
      return south;
    if (this.gameboard.isValidCooridinate(east) && !this.isShot(east))
      return east;
    if (this.gameboard.isValidCooridinate(west) && !this.isShot(west))
      return west;

    return null;
  }

  getOrientation() {
    const first = this.hits[0];
    const second = this.hits[1];

    if (first[0] - second[0] === 0) {
      return 'Vertical';
    } else {
      return 'Horizontal';
    }
  }

  attack() {
    /* while (this.hits.length > 0) {
      const checkHits = this.checkAround(this.hits[0]);
      if (checkHits === null) {
        this.hits.shift();
      } else {
        return checkHits;
      }
    } */
    console.log(this.hits);
    if (this.hits.length === 1) {
      const check = this.checkAround(this.hits[0]);
      if (check) return check;
      this.allHits = this.allHits.concat(this.hits);
      this.hits = [];
    }

    if (this.hits.length >= 2) {
      const orientation = this.getOrientation();
      if (orientation === 'Horizontal') {
        for (let hit of this.hits) {
          const east = this.checkEast(hit);
          if (east) return east;
          const west = this.checkWest(hit);
          if (west) return west;
        }
      }
      if (orientation === 'Vertical') {
        for (let hit of this.hits) {
          const north = this.checkNorth(hit);
          if (north) return north;
          const south = this.checkSouth(hit);
          if (south) return south;
        }
      }
      this.allHits = this.allHits.concat(this.hits);
      this.hits = [];
    }

    const smartCoordinate = this.smartCoordinate();
    if (smartCoordinate) {
      return smartCoordinate;
    }

    for (let hit of this.allHits) {
      const check = this.checkAround(hit);
      if (check) return check;
    }
    return this.randomCoordinate();
  }

  update(coordinate, hit) {
    this.shots.push(coordinate);
    if (hit) {
      this.hits.push(coordinate);
    }
  }

  reset() {
    this.hits = [];
    this.shots = [];
  }
}
