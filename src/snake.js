var saveToLogFile = require('../fs_log');
var inRange = require('../helper/util-function/in-range');
var start = require('../helper/util-function/start');
var sound = require('../helper/util-function/sound');


function Snake(display) {
  this.display = display;
  this.gameVelocity = 60;
  this.directions = {
    up: { x: 0, y: -1 },
    down: { x: 0, y: 1 },
    right: { x: 1, y: 0 },
    left: { x: -1, y: 0 }
  };
  this.initialSnake = 4;

  this.reset();

  // Bind events to display to detect input
  this.display.eventHandlers(
    this.changeDirection.bind(this),
    this.quit.bind(this),
    this.start.bind(this)
  );
}

Snake.prototype.reset = function() {
  // Set up initial state
  this.snake = [];

  for (var i = this.initialSnake; i >= 0; i--) {
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

Snake.prototype.changeDirection = function(_, key) {
  if (key.name === 'up' && this.currentDirection !== 'down') {
    this.currentDirection = 'up';
  }
  if (key.name === 'down' && this.currentDirection !== 'up') {
    this.currentDirection = 'down';
  }
  if (key.name === 'left' && this.currentDirection !== 'right') {
    this.currentDirection = 'left';
  }
  if (key.name === 'right' && this.currentDirection !== 'left') {
    this.currentDirection = 'right';
  }
};

Snake.prototype.move = function() {
  // Move the head forward by one pixel based on velocity
  // snake.x === down & up
  // snake.y === left & right
  var head = {
    x: this.snake[0].x + this.directions[this.currentDirection].x,
    y: this.snake[0].y + this.directions[this.currentDirection].y
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
    sound.hits(); //play sound
    this.display.updateScore(this.score);
    this.generateMaize();
  } else {
    // Otherwise, slither
    this.snake.pop();
  }
};

Snake.prototype.generateRandomPixel = function(min, max) {
  // Get a random coordinate from 0 to max container height/width
  return Math.round(Math.random() * (max - min) + min);
};

Snake.prototype.generateMaize = function() {
  // Generate a maize at a random x/y coordinate
  // minus three to make sure it didn't generate on the the game border
  this.maize.x = this.generateRandomPixel(
    0,
    this.display.gameContainer.width - 3
  );
  this.maize.y = this.generateRandomPixel(
    1,
    this.display.gameContainer.height - 4
  );

  // If the pixel is on a snake, regenerate the maize
  this.snake.forEach(pixel => {
    if (pixel.x === this.maize.x && pixel.y === this.maize.y) {
      this.generateMaize();
    }
  });
};

Snake.prototype.drawSnake = function() {
  // Render each snake segment as a pixel
  this.snake.forEach(segment => {
    this.display.drawObject(segment, 'green');
  });
};

Snake.prototype.drawMaize = function() {
  // Render the maize as a pixel
  this.display.drawObject(this.maize, 'white');
};

Snake.prototype.isGameOver = function() {
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
    this.snake[0].y >= this.display.gameContainer.height - 2 ||
    // Bottom wall
    this.snake[0].y <= -1
  );
};

Snake.prototype.showGameOverScreen = function() {
  this.display.gameOverScreen(this.score);
  this.display.render();
};

Snake.prototype.start = function() {
  if (!this.timer) {
    this.reset();

    this.timer = setInterval(start.bind(this), this.gameVelocity);
  }
};

Snake.prototype.quit = function() {
  process.exit(0);
};

module.exports = Snake;
