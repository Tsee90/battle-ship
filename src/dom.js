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
  buildBoard(player, perspective) {
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

  updateDisplay() {
    this.mainContainer.innerHTML = '';
    this.board1 = this.buildBoard(this.player1, true);
    this.board2 = this.buildBoard(this.player2, false);
    this.mainContainer.appendChild(this.board2);
    this.mainContainer.appendChild(this.board1);
  }

  #init() {
    const body = document.querySelector('body');
    body.appendChild(this.mainContainer);
    this.updateDisplay();
  }
}
