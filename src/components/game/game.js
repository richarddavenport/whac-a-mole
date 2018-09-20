import Mole from '../mole/mole';

class Game {
  constructor() {
    this.state = {
      moles: new Set(),
      gameBoard: document.getElementById('game-board'),
      timer: null
    };
    this.reset();
    this._generateMoles(9);
    this._render();
  }

  get gameBoard() {
    return this.state.gameBoard;
  }

  stop() {
    clearTimeout(this.state.timer);
    this.state.moles.forEach(m => m.stop());
  }

  start() {
    this._loop();
  }

  reset() {
    this.state.moles.clear();
    while (this.state.gameBoard.firstChild) {
      this.state.gameBoard.removeChild(this.state.gameBoard.firstChild);
    }
  }

  _popup() {
    [...this.state.moles.values()][this._randomMole()].go(this._moleTimeout());
  }

  _loop() {
    this._popup();
    this.state.timer = setTimeout(() => this._loop(), this._moleTimeout());
  }

  _generateMoles (numMoles) {
    [...Array(numMoles)].forEach(() => this.state.moles.add(new Mole()));
  }
  
  _render() {
    this.state.moles.forEach(mole => this.state.gameBoard.appendChild(mole.state.element));
  }

  _randomMole() {
    return Math.floor(Math.random() * 9);
  }

  _moleTimeout() {
    return (Math.floor(Math.random() * 3) + 1) * 1000;
  }
}

export default Game;