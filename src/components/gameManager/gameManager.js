import Game from '../game/game';

class GameManager {
    constructor() {
        this._init();
    }
    
    _init() {
        this.state = this._initialState;
        document.querySelector('.score').textContent = this.state.score;
        document.querySelector('.misses').textContent = this.state.misses;
        document.querySelector('.time').textContent = this.state.time;
        this._addPoint = this._addPoint.bind(this);
        this._addMiss = this._addMiss.bind(this);
    }

    get _initialState() {
        return {
            currentGame: new Game(),
            score: 0,
            misses: 0,
            time: 10,
            timer: null,
        };
    }
    
    startGame() {
        if (this.state.time <= 0) return;
        this.state.currentGame.start();
        this._addListeners();
        this._startTimer();
    }

    stopGame() {
        this.state.currentGame.stop();
        clearInterval(this.state.timer);
        this._removeListeners();
    }

    resetGame() {
        this.stopGame();
        this._init();
    }

    _addListeners() {
        this.state.currentGame.gameBoard.addEventListener('whack', this._addPoint, true);
        this.state.currentGame.gameBoard.addEventListener('miss', this._addMiss, true);
    }

    _removeListeners() {
        this.state.currentGame.gameBoard.removeEventListener('whack', this._addPoint, true);
        this.state.currentGame.gameBoard.removeEventListener('miss', this._addMiss, true);
    }

    _addPoint() {
        this.state = {
            ...this.state,
            score: this.state.score + 1
        };
        document.querySelector('.score').innerHTML = this.state.score;
    }
    
    _addMiss() {
        this.state = {
            ...this.state,
            misses: this.state.misses + 1
        };
        document.querySelector('.misses').textContent = this.state.misses;
    }

    _startTimer() {
        this.state.timer = setInterval(() => {
            this.state = {
                ...this.state,
                time: this.state.time - 1
            };
            document.querySelector('.time').textContent = this.state.time;
            if (this.state.time == 0) this.stopGame();
          }, 1000);
    }
}

export default GameManager;