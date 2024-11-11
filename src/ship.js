export class Ship {
  constructor(name, length) {
    this.name = name;
    this.length = length;
    this.hits = 0;
  }

  hit() {
    if (this.hits < this.length) this.hits += 1;
  }

  isSunk() {
    return this.length === this.hits ? true : false;
  }

  getLength() {
    return this.length;
  }

  getName() {
    return this.name;
  }
  reset() {
    this.hits = 0;
  }
}
