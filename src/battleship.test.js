import { BattleShip } from './battleship.js';

test('place carrier player 1', () => {
  const battleship = new BattleShip('Player', 'Computer');
  const player = battleship.getPlayer('Player');
  const ship = player.getGameboard().getCarrier();
  expect(battleship.place(player, ship, [0, 0], 'north')).toBe(true);
});

test('player 1 plays turn misses', () => {
  const battleship = new BattleShip('Player', 'Computer');
  const player = battleship.getPlayer('Player');
  expect(battleship.playTurn(player, [0, 0])).toBe(false);
});

test('player 1 plays turn hits', () => {
  const battleship = new BattleShip('Player', 'Computer');
  const computer = battleship.getPlayer('Computer');
  const ship = computer.getGameboard().getCarrier();
  battleship.place(computer, ship, [0, 0], 'north');
  const player = battleship.getPlayer('Player');
  expect(battleship.playTurn(player, [0, 0])).toBe(true);
});
