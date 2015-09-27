'use strict';

var models = require('../models');
var async = require('async');

var posts = {};

posts.show  = (req, res, next) => { res.send('respond with a resource'); };

posts.add = function(req, res, next) {
};

posts.index = function(req, res, next) {
};

posts.delete = function(req, res, next) {
};

posts.edit = function(req, res, next) {
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

module.exports = posts;
