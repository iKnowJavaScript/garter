#!/usr/bin/env node

var Snake = require('./src/snake');
var Display = require('./src/screenClass');
var snake = new Snake(new Display());

// Begin game
snake.start();

// "bin": {
//   "garter": "./play.js"
// },
// "scripts": {
//   "play": "node play.js"
// },

//"test": "echo \"Error: no test specified\" && exit 1"
