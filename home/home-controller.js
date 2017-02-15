'use strict';

var models = require('../models');
var users = {};

users.show = function(req, res, next) {
  res.send('respond with a resource');
};

users.edit = function(req, res, next) {
  models.User.findAll({
  }).then(function(users) {
    res.render('index', {
      title: 'Express',
      users: users
    });
  });
};

module.exports = users;
