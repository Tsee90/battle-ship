import { Gameboard } from './gameboard.js';

/* 
  Following tests placing on gameboard
*/

test('place carrier ship', () => {
  const gameboard = new Gameboard();
  gameboard.place(gameboard.getCarrier(), [0, 0], 'south');
  expect(gameboard.getCoordinates(gameboard.getCarrier())).toEqual([
    [0, 0],
    [0, 1],
    [0, 2],
    [0, 3],
    [0, 4],
  ]);
});

test('place patrol ship', () => {
  const gameboard = new Gameboard();
  gameboard.place(gameboard.getPatrol(), [5, 5], 'north');
  expect(gameboard.getCoordinates(gameboard.getPatrol())).toEqual([
    [5, 5],
    [5, 4],
  ]);
});

test('place two ships', () => {
  const gameboard = new Gameboard();
  gameboard.place(gameboard.getPatrol(), [5, 5], 'north');
  gameboard.place(gameboard.getCarrier(), [0, 0], 'south');
  expect(gameboard.getCoordinates(gameboard.getPatrol())).toEqual([
    [5, 5],
    [5, 4],
  ]);
  expect(gameboard.getCoordinates(gameboard.getCarrier())).toEqual([
    [0, 0],
    [0, 1],
    [0, 2],
    [0, 3],
    [0, 4],
  ]);
});

test('place non-ship error', () => {
  const gameboard = new Gameboard();
  expect(gameboard.place('String Ship', [0, 0], 'south')).toBe(null);
});

test('place ship error: orientation off board', () => {
  const gameboard = new Gameboard();
  expect(gameboard.place(gameboard.getCarrier(), [0, 0], 'north')).toBe(null);
});

test('place ship error: start Coordinates', () => {
  const gameboard = new Gameboard();
  expect(gameboard.place(gameboard.getCarrier(), [0, -1], 'south')).toBe(null);
});

test('place ship error: overlap', () => {
  const gameboard = new Gameboard();
  gameboard.place(gameboard.getPatrol(), [0, 0], 'south');
  expect(gameboard.place(gameboard.getCarrier(), [0, 0], 'south')).toBe(null);
});

test('place ship error: duplicate', () => {
  const gameboard = new Gameboard();
  gameboard.place(gameboard.getPatrol(), [0, 0], 'south');
  expect(gameboard.place(gameboard.getPatrol(), [9, 9], 'north')).toBe(null);
});

/* 
  Following test receiveAttack on gameboard
*/

test('hit ship', () => {
  const gameboard = new Gameboard();
  gameboard.place(gameboard.getPatrol(), [5, 5], 'west');
  expect(gameboard.receiveAttack([4, 5])).toEqual(true);
});

test('miss ship', () => {
  const gameboard = new Gameboard();
  gameboard.place(gameboard.getPatrol(), [5, 5], 'east');
  expect(gameboard.receiveAttack([4, 5])).toEqual(false);
});

test('hit error overlap', () => {
  const gameboard = new Gameboard();
  gameboard.place(gameboard.getPatrol(), [5, 5], 'north');
  gameboard.receiveAttack([5, 6]);
  expect(gameboard.receiveAttack([5, 6])).toBe(null);
});

test('sink ship via receiveAttack', () => {
  const gameboard = new Gameboard();
  gameboard.place(gameboard.getPatrol(), [5, 5], 'north');
  gameboard.receiveAttack([5, 5]);
  gameboard.receiveAttack([5, 4]);
  expect(gameboard.getPatrol().isSunk()).toEqual(true);
});
