import { Ship } from './ship.js';

test('ship is not sunk', () => {
  const ship = new Ship('', 2);
  ship.hit();
  expect(ship.isSunk()).toBe(false);
});

test('ship is sunk', () => {
  const ship = new Ship('', 2);
  ship.hit();
  ship.hit();
  expect(ship.isSunk()).toBe(true);
});

test('ship is hit', () => {
  const ship = new Ship('', 2);
  ship.hit();
  expect(ship.hits).toBe(1);
});

test('ship length', () => {
  const ship = new Ship('', 2);
  expect(ship.getLength()).toBe(2);
});

test('overkill', () => {
  const ship = new Ship('', 2);
  ship.hit();
  ship.hit();
  ship.hit();
  expect(ship.hits).toBe(2);
});
