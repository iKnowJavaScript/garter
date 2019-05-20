var saveToLogFile = require('../fs_log');
var blessed = require('blessed');

function Display() {
  this.blessed = blessed;
  this.screen = blessed.screen();

  //create display areas
  this.gameBox = this.gameDisplay();
  this.scoreBox = this.scoreDisplay();
  this.gameOverBox = this.gameOverDisplay();

  // to get box width and height
  this.gameContainer = this.blessed.box(this.gameBox);
  this.scoreContainer = this.blessed.box(this.scoreBox);
}

Display.prototype.gameDisplay = function() {
  return {
    parent: this.screen,
    top: 1,
    left: 0,
    width: '100%',
    height: '100%-1',
    style: {
      fg: 'black',
      bg: 'black'
    }
  };
};

Display.prototype.scoreDisplay = function() {
  return {
    parent: this.screen,
    top: 0,
    left: 'left',
    width: '100%',
    height: 1, // take the remaining height left by the gameScreen
    tags: true,
    style: {
      fg: 'white',
      bg: 'blue'
    }
  };
};

Display.prototype.gameOverDisplay = function() {
  return {
    parent: this.screen,
    top: 'center',
    left: 'center',
    width: '75%',
    height: '50%',
    border: {
      type: 'line',
      fg: '#ffffff'
    },
    tags: true,
    valign: 'middle', // vertical text align
    content: `{center}Game Over! \n\n Press enter to try again{/center}`,
    style: { fg: 'white', bg: 'magenta' },
    hoverEffects: {
      bg: 'green'
    }
  };
};

Display.prototype.eventHandlers = function(keyPress, quit, enter) {
  // to get key pressed and quit game
  this.screen.on('keypress', keyPress);
  this.screen.key(['escape', 'q', 'C-c'], quit);
  this.screen.key(['enter'], enter);
};

Display.prototype.drawPixel = function(coord, color) {
  this.blessed.box({
    parent: this.gameContainer,
    top: coord.y,
    left: coord.x,
    width: 1,
    height: 1,
    style: {
      fg: color,
      bg: color
    }
  });
};

// update the score board
Display.prototype.updateScore = function(score) {
  this.scoreContainer.setLine(0, `{bold}Score:{/bold} ${score}`);
};

// Bring gameOver screen forward
Display.prototype.gameOverScreen = function() {
  this.gameContainer = this.blessed.box(this.gameOverBox);
};

// Set to initial screen
Display.prototype.clearScreen = function() {
  //removes gameContainer from its parent
  this.gameContainer.detach();
  this.gameContainer = this.blessed.box(this.gameBox);
};

// Creating a new score box to prevent old snake segments from appearing on it
Display.prototype.resetScore = function() {
  this.scoreContainer.detach();
  this.scoreContainer = this.blessed.box(this.scoreBox);
  this.updateScore(0);
};

Display.prototype.render = function() {
  this.screen.render();
};

module.exports = Display;
