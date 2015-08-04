'use strict';
app.use(function(err, req, res, next) {
  var error = {};
  if (app.get('env') === 'development') {
    error = err;
  }
  res.status(err.status || 500);
  res.render('error', {
    message: err.message,
    error: err
  });
});

module.exports = app;
