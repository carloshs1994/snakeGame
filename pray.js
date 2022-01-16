import { onSnake, expandSnake } from './snake.js';
import { randomGridPosition } from './grid.js'; 
const EXPANSION_RATE = 1;

const getRandomPrayPosition = () => {
  let newPrayPosition;
  while (newPrayPosition == null || onSnake(newPrayPosition)) {
    newPrayPosition = randomGridPosition();
  }
  return newPrayPosition;
}
let pray = getRandomPrayPosition();

export const update = () => {
  if (onSnake(pray)) {
    expandSnake(EXPANSION_RATE);
    pray = getRandomPrayPosition();
  }
}

export const draw = (board) => {
  const prayElement = document.createElement('div');
  prayElement.style.gridRowStart = pray.y;
  prayElement.style.gridColumnStart = pray.x;
  prayElement.classList.add('pray')
  board.appendChild(prayElement);
}