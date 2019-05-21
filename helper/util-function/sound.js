const player = require('play-sound')();

function hits() {
  return player.play('./assets/audio/high.mp3', err => {
    if (err) console.log(`Could not play sound: ${err}`);
  });
}

function die() {
  return player.play('./assets/audio/die.mp3', err => {
    if (err) console.log(`Could not play sound: ${err}`);
  });
}

module.exports = { hits: hits, die: die };
