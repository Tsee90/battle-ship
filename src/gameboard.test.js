import { Gameboard } from './gameboard.js';

/* 
  Following tests check for valid placing on gameboard
*/

test('place carrier ship', () => {
  const gameboard = new Gameboard();
  gameboard.place(gameboard.getCarrier(), [0, 0], 'north');
  expect(gameboard.getPosition(gameboard.getCarrier())).toEqual([
    [0, 0],
    [0, 1],
    [0, 2],
    [0, 3],
    [0, 4],
  ]);
});

test('place patrol ship', () => {
  const gameboard = new Gameboard();
  gameboard.place(gameboard.getPatrol(), [5, 5], 'south');
  expect(gameboard.getPosition(gameboard.getPatrol())).toEqual([
    [5, 5],
    [5, 4],
  ]);
});

test('place two ships', () => {
  const gameboard = new Gameboard();
  gameboard.place(gameboard.getPatrol(), [5, 5], 'south');
  gameboard.place(gameboard.getCarrier(), [0, 0], 'north');
  expect(gameboard.getPosition(gameboard.getPatrol())).toEqual([
    [5, 5],
    [5, 4],
  ]);
  expect(gameboard.getPosition(gameboard.getCarrier())).toEqual([
    [0, 0],
    [0, 1],
    [0, 2],
    [0, 3],
    [0, 4],
  ]);
});

test('place ship error: orientation off board', () => {
  const gameboard = new Gameboard();
  expect(() =>
    gameboard.place(gameboard.getCarrier(), [0, 0], 'south')
  ).toThrow(`Invalid placement`);
});

test('place ship error: start position', () => {
  const gameboard = new Gameboard();
  expect(() =>
    gameboard.place(gameboard.getCarrier(), [0, -1], 'north')
  ).toThrow(`Invalid placement`);
});

test('place ship error: overlap', () => {
  const gameboard = new Gameboard();
  gameboard.place(gameboard.getPatrol(), [0, 0], 'north');
  expect(() =>
    gameboard.place(gameboard.getCarrier(), [0, 0], 'north')
  ).toThrow(`Invalid placement`);
});

test('place ship error: duplicate', () => {
  const gameboard = new Gameboard();
  gameboard.place(gameboard.getPatrol(), [0, 0], 'north');
  expect(() => gameboard.place(gameboard.getPatrol(), [9, 9], 'south')).toThrow(
    `Invalid placement`
  );
});
