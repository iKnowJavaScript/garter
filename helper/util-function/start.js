var sound = require('./sound');

function start() {
  if (this.isGameOver()) {
    sound.die();
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

module.exports = start;
