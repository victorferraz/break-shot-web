'use strict';

var users = {};

users.show = function(req, res, next) {
  res.send('respond with a resource');
};

users.edit = function(req, res, next) {
  res.send('teste');
};

module.exports = users;

