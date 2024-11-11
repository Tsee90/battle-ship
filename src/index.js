import './style.css';
import { Player, Computer } from './player.js';
import { DOM } from './dom.js';

const player1 = new Player('Player');
const player2 = new Computer('Computer');
const player1Board = player1.getGameboard();
const player2Board = player2.getGameboard();

//Initialize Player 1 Board. TODO: Allow player to place ships

player1Board.place(player1Board.getCarrier(), [0, 0], 'south');
player1Board.place(player1Board.getBattleship(), [1, 0], 'south');
player1Board.place(player1Board.getDestroyer(), [2, 0], 'south');
player1Board.place(player1Board.getSubmarine(), [3, 0], 'south');
player1Board.place(player1Board.getPatrol(), [4, 0], 'south');

const dom = new DOM(player1, player2);

function createTileEventListeners() {
  const board2Tiles = dom.getBoard2Tiles();
  board2Tiles.forEach((tile) => {
    if (!player2Board.isHit(tile.coordinate)) {
      tile.addEventListener('click', clickTile);
    }
  });
}

function reset() {
  player1Board.reset();
  player2Board.reset();
  player1Board.place(player1Board.getCarrier(), [0, 0], 'south');
  player1Board.place(player1Board.getBattleship(), [1, 0], 'south');
  player1Board.place(player1Board.getDestroyer(), [2, 0], 'south');
  player1Board.place(player1Board.getSubmarine(), [3, 0], 'south');
  player1Board.place(player1Board.getPatrol(), [4, 0], 'south');
  player2.placeAll();
  dom.updateDisplay();
  createTileEventListeners();
}

createTileEventListeners();

function clickTile(event) {
  event.preventDefault();
  const coordinate = event.target.coordinate;
  const attack = player2Board.receiveAttack(coordinate);
  if (attack !== null) {
    dom.updateDisplay();
    if (player2Board.isAllSunk()) {
      alert('Player Wins');
      setTimeout(() => {
        reset();
      }, 1000);
    } else {
      if (player2 instanceof Computer) {
        let computerAttack = null;
        while (computerAttack === null) {
          computerAttack = player1Board.receiveAttack(player2.attack());
        }
      }
      dom.updateDisplay();
      if (player1Board.isAllSunk()) {
        alert('Computer Wins');
        setTimeout(() => {
          reset();
        }, 1000);
      }
    }
  }

  createTileEventListeners();
}
