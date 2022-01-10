import { SNAKE_SPEED, update as updateSnake, draw as drawSnake, snakeHead, snakeIntersection } from './snake.js';
import { update as updatePray, draw as drawPray } from './pray.js';
import { outsideGrid } from './grid.js';
const board = document.getElementById('board')
let lastRenderTime = 0;
let gameOver = false;

const checkDeath = () => {
  gameOver = outsideGrid(snakeHead()) || snakeIntersection();
}

const update = () => {
  updateSnake();
  updatePray();
  checkDeath();
}

const draw = () => {
  board.innerHTML = '';
  drawSnake(board);
  drawPray(board);
}

const main = (currentTime) => {
  if (gameOver) {
    if (confirm('You lost. Press OK to restart.')) {
      window.location = '/';
    }
    return
  }

  window.requestAnimationFrame(main);
  const secondsScinceLastRender = (currentTime - lastRenderTime) / 1000;
  if (secondsScinceLastRender < 1 / SNAKE_SPEED) return

  lastRenderTime = currentTime;

  update();
  draw();
}

window.requestAnimationFrame(main);