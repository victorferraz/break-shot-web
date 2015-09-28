'use strict';

var models = require('../models');
var async = require('async');
var controller = require('../core/controller');

var process = {};

process.getBreakPoints  = (req, res, next) => {
    controller.go(req.body);
    next();
};

module.exports = process;
