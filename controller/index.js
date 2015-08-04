'use strict';

var fs = require('fs');
var controllers = [];


fs.readdirSync(__dirname).forEach(function(file){
  if (file.match(/\.js/gi) && file !== 'index.js'){
    var fileName = file.split('.')[0];
    controllers[fileName] = [];
    controllers[fileName] = require(__dirname + '/' + file);
  }
});

module.exports = controllers;
