import { Ship } from './ship.js';

export class Gameboard {
  constructor() {
    this.carrier = new Ship('carrier', 5);
    this.battleship = new Ship('battleship', 4);
    this.destroyer = new Ship('destroyer', 3);
    this.submarine = new Ship('submarine', 3);
    this.patrol = new Ship('patrol', 2);
    this.shipCoordinates = {};
    this.hitCoordinates = [];
  }

  getCarrier() {
    return this.carrier;
  }

  getBattleship() {
    return this.battleship;
  }

  getDestroyer() {
    return this.destroyer;
  }

  getSubmarine() {
    return this.submarine;
  }

  getPatrol() {
    return this.patrol;
  }

  getCoordinates(ship) {
    let results = [];
    for (let [key, value] of Object.entries(this.shipCoordinates)) {
      if (value.getName() === ship.getName()) {
        const temp = key.split(',').map(Number);
        results.push(temp);
      }
    }
    if (results.length > 0) return results;
    return null;
  }

  isValidCooridinate(coordinate) {
    if (
      !Array.isArray(coordinate) ||
      coordinate.length !== 2 ||
      coordinate[0] < 0 ||
      coordinate[0] > 9 ||
      coordinate[1] < 0 ||
      coordinate[1] > 9
    )
      return false;
    return true;
  }

  isValidOrientation(orientation) {
    if (
      orientation === 'north' ||
      orientation === 'east' ||
      orientation === 'south' ||
      orientation === 'west'
    )
      return true;
    return false;
  }

  isEmpty(coordinate) {
    return `${coordinate}` in this.shipCoordinates ? false : true;
  }

  isPlaceable(ship, coordinate, orientation) {
    let result = true;
    if (
      !(ship instanceof Ship) ||
      !this.isValidOrientation(orientation) ||
      this.getCoordinates(ship)
    )
      return false;

    if (orientation === 'north') {
      for (let i = 0; i < ship.getLength(); i++) {
        const current = [coordinate[0], coordinate[1] + i];
        if (!this.isEmpty(current) || !this.isValidCooridinate(current))
          result = false;
      }
    }
    if (orientation === 'east') {
      for (let i = 0; i < ship.getLength(); i++) {
        const current = [coordinate[0] + i, coordinate[1]];
        if (!this.isEmpty(current) || !this.isValidCooridinate(current))
          result = false;
      }
    }
    if (orientation === 'south') {
      for (let i = 0; i < ship.getLength(); i++) {
        const current = [coordinate[0], coordinate[1] - i];
        if (!this.isEmpty(current) || !this.isValidCooridinate(current))
          result = false;
      }
    }
    if (orientation === 'west') {
      for (let i = 0; i < ship.getLength(); i++) {
        const current = [coordinate[0] - i, coordinate[1]];
        if (!this.isEmpty(current) || !this.isValidCooridinate(current))
          result = false;
      }
    }
    return result;
  }

  place(ship, coordinate, orientation) {
    if (!this.isPlaceable(ship, coordinate, orientation))
      throw new Error(`Invalid placement`);

    if (orientation === 'north') {
      for (let i = 0; i < ship.getLength(); i++) {
        const current = [coordinate[0], coordinate[1] + i];
        this.shipCoordinates[`${current}`] = ship;
      }
    }
    if (orientation === 'east') {
      for (let i = 0; i < ship.getLength(); i++) {
        const current = [coordinate[0] + i, coordinate[1]];
        this.shipCoordinates[`${current}`] = ship;
      }
    }
    if (orientation === 'south') {
      for (let i = 0; i < ship.getLength(); i++) {
        const current = [coordinate[0], coordinate[1] - i];
        this.shipCoordinates[`${current}`] = ship;
      }
    }
    if (orientation === 'west') {
      for (let i = 0; i < ship.getLength(); i++) {
        const current = [coordinate[0] - i, coordinate[1]];
        this.shipCoordinates[`${current}`] = ship;
      }
    }
  }

  isHit(coordinate) {
    for (let hit of this.hitCoordinates) {
      if (hit[0] === coordinate[0] && hit[1] === coordinate[1]) return true;
    }
    return false;
  }

  receiveAttack(coordinate) {
    if (!this.isValidCooridinate(coordinate) || this.isHit(coordinate))
      throw new Error(`Invalid hit coordinate`);

    this.hitCoordinates.push(coordinate);
    if (!this.isEmpty(coordinate)) {
      const ship = this.shipCoordinates[`${coordinate}`];
      ship.hit();
      return true;
    }
    return false;
  }
}
