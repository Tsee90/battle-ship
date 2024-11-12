import rotateSVG from './img/rotate.svg';

export class DOM {
  constructor(player1, player2) {
    this.mainContainer = this.createDiv('main-container');
    this.player1 = player1;
    this.player2 = player2;
    this.#init();
  }

  getBoard1Tiles() {
    return this.board1.querySelectorAll('.tile');
  }

  getBoard2Tiles() {
    return this.board2.querySelectorAll('.tile');
  }

  createDiv(id, ...cls) {
    const div = document.createElement('div');
    for (const each of cls) {
      div.classList.add(each);
    }
    div.id = id;
    return div;
  }

  createTile(x, y) {
    const tile = this.createDiv('', 'tile');
    tile.coordinate = [x, y];
    return tile;
  }
  createBoard(player, perspective) {
    const gameboardDisplay = this.createDiv('', 'gameboard');
    const gameboard = player.getGameboard();
    for (let y = 0; y < 10; y++) {
      for (let x = 0; x < 10; x++) {
        const tile = this.createTile(x, y);
        if (!perspective) {
          tile.classList.add('off');
        }
        if (!gameboard.isEmpty([x, y]) && perspective) {
          tile.classList.add('ship');
        }
        if (gameboard.isHit([x, y]) && !gameboard.isEmpty([x, y])) {
          tile.classList.add('hit');
        } else if (gameboard.isHit([x, y]) && gameboard.isEmpty([x, y])) {
          tile.classList.add('miss');
        }
        gameboardDisplay.appendChild(tile);
      }
    }
    return gameboardDisplay;
  }

  createSVG(img) {
    const svg = document.createElement('img');
    svg.src = img;
    return svg;
  }

  createDragContainer(player) {
    const gameboard = player.getGameboard();

    const dragContainer = this.createDiv('drag-container', 'east');

    const carrier = this.createDraggable('carrier', player);
    carrier.ship = gameboard.getCarrier();

    const battleship = this.createDraggable('battleship', player);
    battleship.ship = gameboard.getBattleship();

    const destroyer = this.createDraggable('destroyer', player);
    destroyer.ship = gameboard.getDestroyer();

    const submarine = this.createDraggable('submarine', player);
    submarine.ship = gameboard.getSubmarine();

    const patrol = this.createDraggable('patrol', player);
    patrol.ship = gameboard.getPatrol();

    const rotate = this.createSVG(rotateSVG);
    rotate.id = 'rotate';

    const start = document.createElement('button');
    start.id = 'start-button';
    start.textContent = 'Start';

    dragContainer.appendChild(start);
    dragContainer.appendChild(rotate);
    this.appendDraggable(carrier, dragContainer);
    this.appendDraggable(battleship, dragContainer);
    this.appendDraggable(destroyer, dragContainer);
    this.appendDraggable(submarine, dragContainer);
    this.appendDraggable(patrol, dragContainer);

    return dragContainer;
  }

  createDraggable(id) {
    const div = this.createDiv(id, 'draggable', 'east');
    div.draggable = true;
    return div;
  }

  getDragContainer() {
    return document.querySelector('#drag-container');
  }

  getRotate() {
    return document.querySelector('#rotate');
  }

  getStart() {
    return document.querySelector('#start-button');
  }

  appendDraggable(draggable, dragContainer) {
    if (dragContainer.classList.contains('east')) {
      draggable.orientation = 'east';
      draggable.classList.remove('south');
      draggable.classList.add('east');
    } else {
      draggable.orientation = 'south';
      draggable.classList.remove('east');
      draggable.classList.add('south');
    }
    dragContainer.appendChild(draggable);
  }

  getDraggables() {
    return document.querySelectorAll('.draggable');
  }

  rotateDragContainer() {
    const dragContainer = document.querySelector('#drag-container');
    if (dragContainer.classList.contains('east')) {
      dragContainer.classList.remove('east');
      dragContainer.classList.add('south');
      const childList = dragContainer.childNodes;
      childList.forEach((child) => {
        child.classList.remove('east');
        child.classList.add('south');
        child.orientation = 'south';
      });
    } else {
      dragContainer.classList.remove('south');
      dragContainer.classList.add('east');
      const childList = dragContainer.childNodes;
      childList.forEach((child) => {
        child.classList.remove('south');
        child.classList.add('east');
        child.orientation = 'east';
      });
    }
  }

  updateDisplay() {
    this.mainContainer.innerHTML = '';
    this.board1 = this.createBoard(this.player1, true);
    this.board2 = this.createBoard(this.player2, false);
    this.mainContainer.appendChild(this.board1);
    this.mainContainer.appendChild(this.board2);
  }

  reset() {
    const draggables = this.createDragContainer(this.player1);
    this.mainContainer.innerHTML = '';
    this.board1 = this.createBoard(this.player1, true);
    this.mainContainer.appendChild(this.board1);
    this.mainContainer.appendChild(draggables);
  }

  #init() {
    const body = document.querySelector('body');
    const draggables = this.createDragContainer(this.player1);
    body.appendChild(this.mainContainer);
    this.board1 = this.createBoard(this.player1, true);
    this.mainContainer.appendChild(this.board1);
    this.mainContainer.appendChild(draggables);
  }
}
