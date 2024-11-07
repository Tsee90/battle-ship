import { Gameboard } from './gameboard.js';

test('isEmpty', () => {
  const gameboard = new Gameboard();
  expect(gameboard.isEmpty([0, 0])).toBe(true);
});

test('place ship', () => {
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
