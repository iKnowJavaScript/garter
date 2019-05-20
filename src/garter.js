var saveToLogFile = require('../fs_log');

var gameVelocity = 60;
var directions = {
  up: { x: 0, y: -1 },
  down: { x: 0, y: 1 },
  right: { x: 1, y: 0 },
  left: { x: -1, y: 0 }
};
var initialSnake = 4;
var snakeColor = 'green';
var pixelColor = 'white';

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

  for (var i = initialSnake; i >= 0; i--) {
    this.snake.push({ x: i + 1, y: 0 });
  }

  this.maize = {};
  this.score = 0;
  this.currentDirection = 'right';
  this.timer = null;

  // Generate the first maize before the game begins
  this.generateMaize();
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
 * make the snake move, unless the snake collides with a maize - then increase
 * the score and increase the length of the snake by one.
 *
 */
Garter.prototype.move = function() {
  // Move the head forward by one pixel based on velocity
  // snake.x === down & up
  // snake.y === left & right
  var head = {
    x: this.snake[0].x + directions[this.currentDirection].x,
    y: this.snake[0].y + directions[this.currentDirection].y
  };

  // targeting all cases for maize, especially the sides
  var mixMaizeX = this.maize.x - 1;
  var maxMaizeX = this.maize.x + 1;

  this.snake.unshift(head);
  // If the snake eats a maize, increase the score and generate a new maize
  if (
    inRange(this.snake[0].x, mixMaizeX, maxMaizeX) &&
    this.snake[0].y === this.maize.y
  ) {
    this.score += 3;
    this.display.updateScore(this.score);
    this.generateMaize();
  } else {
    // Otherwise, slither
    this.snake.pop();
  }
};

Garter.prototype.generateRandomPixel = function(min, max) {
  // Get a random coordinate from 0 to max container height/width
  return Math.round(Math.random() * (max - min) + min);
};

Garter.prototype.generateMaize = function() {
  // Generate a maize at a random x/y coordinate
  // minus three to make sure it didn't generate on the the game border
  this.maize.x = this.generateRandomPixel(
    0,
    this.display.gameContainer.width - 3
  );
  this.maize.y = this.generateRandomPixel(
    1,
    this.display.gameContainer.height - 2
  );

  // If the pixel is on a snake, regenerate the maize
  this.snake.forEach(pixel => {
    if (pixel.x === this.maize.x && pixel.y === this.maize.y) {
      this.generateMaize();
    }
  });
};

Garter.prototype.drawSnake = function() {
  // Render each snake segment as a pixel
  this.snake.forEach(segment => {
    this.display.drawObject(segment, snakeColor);
  });
};

Garter.prototype.drawMaize = function() {
  // Render the maize as a pixel
  this.display.drawObject(this.maize, pixelColor);
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
    // Added the padding because of the border around the display
    this.snake[0].x >= this.display.gameContainer.width - 3 ||
    // Left wall
    this.snake[0].x <= -3 ||
    // Top wall
    this.snake[0].y >= this.display.gameContainer.height - 1 ||
    // Bottom wall
    this.snake[0].y <= -1
  );
};

Garter.prototype.showGameOverScreen = function() {
  this.display.gameOverScreen(this.score);
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
  this.drawMaize();
  this.move();
  this.drawSnake();
  this.display.render();
}

function inRange(x, min, max) {
  return (x - min) * (x - max) <= 0;
}

module.exports = Garter;
