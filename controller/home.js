'use strict';

var models = require('../models');
var home = {};

home.index = (req, res) => res.render('index', {});
module.exports = home;

