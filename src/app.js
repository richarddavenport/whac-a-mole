import 'babel-polyfill';
import GameManager from './comonents/gameManager/gameManager';

const appTemplate = `
<button onclick="GameManager.startGame();">Start</button>
<button onclick="GameManager.stopGame();">Stop</button>
<div>Time: <span class="time"></span></div>
<main id="game-board"></main>
<span>Score: <span class="score"></span></span>
<span>Misses: <span class="misses"></span></span>
<div><button onclick="GameManager.resetGame();">Reset</button></div>
`;

class App {
    constructor() {
        this._render();
    }

    _render() {
        document.getElementById('root').innerHTML = appTemplate;
        window.GameManager = new GameManager();
    }
}

window.onload = () => new App();