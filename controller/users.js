'use strict';

var models = require('../models');
var async = require('async');

var users = {};

users.show = function(req, res, next) {
  res.send('respond with a resource');
};

users.add = function(req, res, next) {
};


users.index = function(req, res, next) {
};

users.delete = function(req, res, next) {
};

users.edit = function(req, res, next) {
  async.auto({
    users: function (cb) {
      models.User.findAll().then(cb);
    },
    posts: function (cb) {
      models.Post.findAll().then(cb);
    }
  }, function (err, results) {
    res.render('index', {
      title: 'Express',
      results: results
    });
  });
};

module.exports = users;
