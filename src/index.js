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

function createRetryListener() {
  const retry = dom.getRetry();
  retry.addEventListener('click', (event) => {
    event.preventDefault();
    reset();
  });
}

function clickTile(event) {
  event.preventDefault();
  const coordinate = event.target.coordinate;
  const attack = player2Board.receiveAttack(coordinate);
  if (attack !== null) {
    dom.updateDisplay();
    if (player2Board.isAllSunk()) {
      dom.updateMessage('Player Wins!');
      dom.grayOut();
      createRetryListener();
    } else {
      if (player2 instanceof Computer) {
        let computerAttack = null;
        while (computerAttack === null) {
          computerAttack = player1Board.receiveAttack(player2.attack());
        }
      }
      dom.updateDisplay();
      if (player1Board.isAllSunk()) {
        dom.updateMessage('Computer Wins!');
        dom.grayOut();
        createRetryListener();
      }
    }
  }
  createAttackListener();
}

function createDraggablesListener() {
  const draggables = dom.getDraggables();
  draggables.forEach((div) => {
    div.addEventListener('dragstart', (event) => {
      event.dataTransfer.setData('text/plain', event.target.id);
      player1Board.removeShip(div.ship);
    });
  });
}

function createRotateListener() {
  const rotate = dom.getRotate();
  rotate.addEventListener('click', (event) => {
    event.preventDefault();
    dom.rotateDragContainer();
    createDragContainerListener();
  });
}

function createStartListener() {
  const start = dom.getStart();
  start.addEventListener('click', (event) => {
    event.preventDefault();
    if (player1Board.isAllPlaced()) {
      player2.placeAll();
      dom.updateDisplay();
      createAttackListener();
      dom.updateMessage(
        'Select a tile on your opponents board to attack. Yellow indicates a miss. Red indicates a hit. Everytime you attack your opponent will attack you back!'
      );
    } else {
      dom.updateMessage('Please place all ships before starting.');
    }
  });
}

function createDragContainerListener() {
  const dragContainer = dom.getDragContainer();
  dragContainer.addEventListener('dragover', (event) => {
    event.preventDefault();
  });

  dragContainer.addEventListener('drop', (event) => {
    event.preventDefault();
    const data = event.dataTransfer.getData('text/plain');
    const draggable = document.getElementById(data);
    dom.appendDraggable(draggable, dragContainer);
  });
}

function startScreenEventListeners() {
  createDraggablesListener();
  createRotateListener();
  createStartListener();
  createDragContainerListener();
  createDropListener();
}

const player1 = new Player('Player');
const player2 = new Computer('Computer');
const player1Board = player1.getGameboard();
const player2Board = player2.getGameboard();
const dom = new DOM(player1, player2);
startScreenEventListeners();
