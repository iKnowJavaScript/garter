#!/usr/bin/env node

const Garter = require('./src/garter');
const Display = require('./src/screenClass');
const garter = new Garter(new Display());

// Begin game
garter.start();


// "bin": {
//   "garter": "./play.js"
// },
// "scripts": {
//   "play": "node play.js"
// },

    //"test": "echo \"Error: no test specified\" && exit 1"
