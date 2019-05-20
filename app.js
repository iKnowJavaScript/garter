#!/usr/bin/env node

var Garter = require('./src/garter');
var Display = require('./src/screenClass');
var garter = new Garter(new Display());

// Begin game
garter.start();

// "bin": {
//   "garter": "./play.js"
// },
// "scripts": {
//   "play": "node play.js"
// },

//"test": "echo \"Error: no test specified\" && exit 1"
