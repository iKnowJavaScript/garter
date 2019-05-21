#!/usr/bin/env node

var Snake = require('./src/snake');
var Display = require('./src/screenClass');

var snake = new Snake(new Display());

// start game
snake.start();
