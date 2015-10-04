'use strict';

var models = require('../models');
var async = require('async');
var controller = require('../core/controller');


process.getBreakPoints = (req, res, next) => {
    res.setHeader('Content-Type', 'application/json');
    res.send('testeteste');
  //  controller.go(req.body).then(function(data){
    //    res.send(JSON.stringify(data));
   // });
};



module.exports = process;
