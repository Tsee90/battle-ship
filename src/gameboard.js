import { Ship } from './ship.js';

export class Gameboard {
  constructor() {
    this.carrier = new Ship('carrier', 5);
    this.battleship = new Ship('battleship', 4);
    this.destroyer = new Ship('destroyer', 3);
    this.submarine = new Ship('submarine', 3);
    this.patrol = new Ship('patrol', 2);
    this.shipPositions = {};
    this.hitPositions = {};
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

  getPosition(ship) {
    let results = [];
    for (let [key, value] of Object.entries(this.shipPositions)) {
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
    if (`${coordinate}` in this.shipPositions) return false;
    return true;
  }

  isPlaceable(ship, coordinate, orientation) {
    let result = true;
    if (!this.isValidOrientation(orientation)) return false;
    if (this.getPosition(ship)) return false;
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
        this.shipPositions[`${current}`] = ship;
      }
    }
    if (orientation === 'east') {
      for (let i = 0; i < ship.getLength(); i++) {
        const current = [coordinate[0] + i, coordinate[1]];
        this.shipPositions[`${current}`] = ship;
      }
    }
    if (orientation === 'south') {
      for (let i = 0; i < ship.getLength(); i++) {
        const current = [coordinate[0], coordinate[1] - i];
        this.shipPositions[`${current}`] = ship;
      }
    }
    if (orientation === 'west') {
      for (let i = 0; i < ship.getLength(); i++) {
        const current = [coordinate[0] - i, coordinate[1]];
        this.shipPositions[`${current}`] = ship;
      }
    }
  }
}
