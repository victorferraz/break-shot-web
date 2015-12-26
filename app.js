var express = require('express');
var browserify = require('browserify-middleware');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');

var routes = require('./routes');
var app = express();


app.get('/javascripts/main.js', browserify('public/javascripts/main.js', {
  cache: true,
  precompile: true
}));

app.use(express.static(path.join(__dirname, 'public')));
app.use(express.static(path.join(__dirname, 'tmp')));
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(
  require('node-compass')({
    mode: 'expanded'
  })
);


app.use('/', routes);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});


// error handlers
app.use(function(err, req, res, next) {
  var errorStatus = {};
  console.log(err);
  if (app.get('env') === 'development') {
    errorStatus = err;
  }
  res.status(err.status || 500);
  res.render('error', {
    message: err.message,
    error: errorStatus
  });
});


module.exports = app;
