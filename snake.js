import { getInputDirection } from './input.js';
export const SNAKE_SPEED = 10;
const snakeBody = [{ x: 11, y: 11 }];
let newSegments = 0;

const addSegments = () => {
  for (let i = 0; i < newSegments; i+=1) {
    snakeBody.push({ ...snakeBody[snakeBody.length - 1] });
  }
  newSegments = 0;
}

export const update = () => {
  addSegments();
  const inputDirection = getInputDirection();
  for (let i = snakeBody.length -2; i >= 0; i-=1) {
    snakeBody[i+1] = { ...snakeBody[i] }
  }
  snakeBody[0].x += inputDirection.x;
  snakeBody[0].y += inputDirection.y;
}

export const draw = (board) => {
  snakeBody.forEach(segment => {
    const snakeElement = document.createElement('div');
    snakeElement.style.gridRowStart = segment.y;
    snakeElement.style.gridColumnStart = segment.x;
    snakeElement.classList.add('snake')
    board.appendChild(snakeElement);
  });
}

export const expandSnake = (amount) => {
  newSegments += amount;
}

const equalPosition = (pos1, pos2) => {
  return pos1.x === pos2.x && pos1.y === pos2.y;
}

export const onSnake = (position, { ignoreHead = false } = {}) => {
  return snakeBody.some((segment, index) => {
    if (ignoreHead && index === 0) return false;
    return equalPosition(segment, position);
  });
}

export const snakeHead = () => {
  return snakeBody[0];
}

export const snakeIntersection = () => {
  return onSnake(snakeBody[0], { ignoreHead: true })
}
