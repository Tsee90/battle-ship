import { Player } from './player.js';

export class BattleShip {
  constructor(player1Name, player2Name) {
    this.player1 = new Player(player1Name);
    this.player2 = new Player(player2Name);
  }
  getPlayer(name) {
    if (name === this.player1.getName()) {
      return this.player1;
    } else if (name === this.player2.getName()) {
      return this.player2;
    }
    return null;
  }

  place(player, ship, coordinate, orientation) {
    if (player.getName() === this.player1.getName()) {
      try {
        return this.player1.getGameboard().place(ship, coordinate, orientation);
      } catch {
        return null;
      }
    } else if (player.getName() === this.player2.getName()) {
      try {
        return this.player2.getGameboard().place(ship, coordinate, orientation);
      } catch {
        return null;
      }
    }
    return null;
  }

  playTurn(player, coordinate) {
    if (player.getName() === this.player1.getName()) {
      try {
        return this.player2.getGameboard().receiveAttack(coordinate);
      } catch {
        return null;
      }
    } else if (player.getName() === this.player2.getName()) {
      try {
        return this.player1.getGameboard().receiveAttack(coordinate);
      } catch {
        return null;
      }
    }
    return null;
  }
}
