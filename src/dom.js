export class DOM {
  constructor(player1, player2) {
    this.mainContainer = this.createDiv('main-container');
    this.board1 = this.buildBoard(player1, true);
    this.board2 = this.buildBoard(player2, false);
    this.#init();
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
    tile.coordinate = `${x},${y}`;
    return tile;
  }
  buildBoard(player, perspective) {
    const gameboardDisplay = this.createDiv('', 'gameboard');
    const gameboard = player.getGameboard();
    for (let y = 0; y < 10; y++) {
      for (let x = 0; x < 10; x++) {
        const tile = this.createTile(x, y);
        if (!gameboard.isEmpty([x, y]) && perspective) {
          tile.classList.add('ship');
        }
        gameboardDisplay.appendChild(tile);
      }
    }
    return gameboardDisplay;
  }

  updateDisplay() {
    this.mainContainer.innerHTML = '';
    this.mainContainer.appendChild(this.board2);
    this.mainContainer.appendChild(this.board1);
  }

  #init() {
    const body = document.querySelector('body');
    body.appendChild(this.mainContainer);
    this.updateDisplay();
  }
}
