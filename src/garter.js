var saveToLogFile = require('../fs_log');

var gameVelocity = 50;
var directions = {
  up: { x: 0, y: -1 },
  down: { x: 0, y: 1 },
  right: { x: 1, y: 0 },
  left: { x: -1, y: 0 }
};
var initialSnakeSize = 4;
var snakeColor = 'green';
var pixelColor = 'red';

function Garter(display) {
  this.display = display;

  this.reset();

  // Bind events to display to detect input
  this.display.eventHandlers(
    this.changeDirection.bind(this),
    this.quit.bind(this),
    this.start.bind(this)
  );
}

Garter.prototype.reset = function() {
  // Set up initial state
  this.snake = [];

  for (let i = initialSnakeSize; i >= 0; i--) {
    this.snake.push({ x: i, y: 0 });
  }

  this.dot = {};
  this.score = 0;
  this.currentDirection = 'right';
  this.timer = null;

  // Generate the first dot before the game begins
  this.generateDot();
  this.display.resetScore();
  this.display.render();
};

/**
 * Support WASD and arrow key controls. Update the direction of the snake, and
 * do not allow reversal.
 */
Garter.prototype.changeDirection = function(_, key) {
  if (
    (key.name === 'up' || key.name === 'w') &&
    this.currentDirection !== 'down'
  ) {
    this.currentDirection = 'up';
  }
  if (
    (key.name === 'down' || key.name === 's') &&
    this.currentDirection !== 'up'
  ) {
    this.currentDirection = 'down';
  }
  if (
    (key.name === 'left' || key.name === 'a') &&
    this.currentDirection !== 'right'
  ) {
    this.currentDirection = 'left';
  }
  if (
    (key.name === 'right' || key.name === 'd') &&
    this.currentDirection !== 'left'
  ) {
    this.currentDirection = 'right';
  }
};

/**
 * Set the velocity of the snake based on the current direction. Create a new
 * head by adding a new segment to the beginning of the snake array,
 * increasing by one velocity. Remove one item from the end of the array to
 * make the snake move, unless the snake collides with a dot - then increase
 * the score and increase the length of the snake by one.
 *
 */
Garter.prototype.move = function() {
  // Move the head forward by one pixel based on velocity
  // snake.x === down & up
  // snake.y === left & right
  const head = {
    x: this.snake[0].x + directions[this.currentDirection].x,
    y: this.snake[0].y + directions[this.currentDirection].y
  };

  this.snake.unshift(head);

  // If the snake eats a dot, increase the score and generate a new dot
  if (this.snake[0].x === this.dot.x && this.snake[0].y === this.dot.y) {
    this.score++;
    this.display.updateScore(this.score);
    this.generateDot();
  } else {
    // Otherwise, slither
    this.snake.pop();
  }
};

Garter.prototype.generateRandomPixelCoord = function(min, max) {
  // Get a random coordinate from 0 to max container height/width
  return Math.round(Math.random() * (max - min) + min);
};

Garter.prototype.generateDot = function() {
  // Generate a dot at a random x/y coordinate
  this.dot.x = this.generateRandomPixelCoord(
    0,
    this.display.gameContainer.width - 1
  );
  this.dot.y = this.generateRandomPixelCoord(
    1,
    this.display.gameContainer.height - 1
  );

  // If the pixel is on a snake, regenerate the dot
  this.snake.forEach(segment => {
    if (segment.x === this.dot.x && segment.y === this.dot.y) {
      this.generateDot();
    }
  });
};

Garter.prototype.drawSnake = function() {
  // Render each snake segment as a pixel
  this.snake.forEach(segment => {
    this.display.drawPixel(segment, snakeColor);
  });
};

Garter.prototype.drawDot = function() {
  // Render the dot as a pixel
  this.display.drawPixel(this.dot, pixelColor);
};

Garter.prototype.isGameOver = function() {
  // If the snake collides with itself, end the game
  const collide = this.snake
    // Filter out the head
    .filter((_, i) => i > 0)
    // If head collides with any segment, collision
    .some(
      segment => segment.x === this.snake[0].x && segment.y === this.snake[0].y
    );

  // returns true if it collides with anything else false
  return (
    collide ||
    // Right wall
    this.snake[0].x >= this.display.gameContainer.width - 1 ||
    // Left wall
    this.snake[0].x <= -1 ||
    // Top wall
    this.snake[0].y >= this.display.gameContainer.height - 1 ||
    // Bottom wall
    this.snake[0].y <= -1
  );
};

Garter.prototype.showGameOverScreen = function() {
  this.display.gameOverScreen();
  this.display.render();
};

Garter.prototype.start = function() {
  if (!this.timer) {
    this.reset();

    this.timer = setInterval(tick.bind(this), gameVelocity);
  }
};

Garter.prototype.quit = function() {
  process.exit(0);
};

function tick() {
  if (this.isGameOver()) {
    this.showGameOverScreen();
    clearInterval(this.timer);
    this.timer = null;
    return;
  }

  this.display.clearScreen();
  this.drawDot();
  this.move();
  this.drawSnake();
  this.display.render();
}

module.exports = Garter;
