import './style.css';
import { Player, Computer } from './player.js';
import { DOM } from './dom.js';

function createAttackListener() {
  const board2Tiles = dom.getBoard2Tiles();
  board2Tiles.forEach((tile) => {
    if (!player2Board.isHit(tile.coordinate)) {
      tile.addEventListener('click', clickTile);
    }
  });
}

function createDropListener() {
  const board1Tiles = dom.getBoard1Tiles();
  board1Tiles.forEach((tile) => {
    tile.addEventListener('dragover', (event) => {
      event.preventDefault();
    });
    tile.addEventListener('drop', (event) => {
      event.preventDefault();
      const data = event.dataTransfer.getData('text/plain');
      const draggable = document.getElementById(data);
      if (draggable) {
        if (
          player1Board.isPlaceable(
            draggable.ship,
            tile.coordinate,
            draggable.orientation
          )
        ) {
          player1Board.place(
            draggable.ship,
            tile.coordinate,
            draggable.orientation
          );
          console.log(player1Board.shipCoordinates);
          tile.appendChild(draggable);
        } else {
          dom.appendDraggable(draggable, dom.getDragContainer());
        }
      }
    });
  });
}

function reset() {
  player1Board.reset();
  player2Board.reset();
  dom.reset();
  startScreenEventListeners();
}

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
  createAttackListener();
}

function startScreenEventListeners() {
  const draggables = dom.getDraggables();
  draggables.forEach((div) => {
    div.addEventListener('dragstart', (event) => {
      event.dataTransfer.setData('text/plain', event.target.id);
      player1Board.removeShip(div.ship);
    });
  });

  const rotate = dom.getRotate();
  rotate.addEventListener('click', (event) => {
    event.preventDefault();
    dom.rotateDragContainer();
  });

  const start = dom.getStart();
  start.addEventListener('click', (event) => {
    event.preventDefault();
    if (player1Board.isAllPlaced()) {
      player2.placeAll();
      dom.updateDisplay();
      createAttackListener();
    }
  });

  createDropListener();
}

const player1 = new Player('Player');
const player2 = new Computer('Computer');
const player1Board = player1.getGameboard();
const player2Board = player2.getGameboard();
const dom = new DOM(player1, player2);
startScreenEventListeners();
