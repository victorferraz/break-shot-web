'use strict';

var gulp = require('gulp');
var nodemon = require('gulp-nodemon');

gulp.task('develop', function () {
  nodemon({ script: 'bin/www',
  ext: 'html js' })
    .on('restart', function () {
        console.log('reloaded');
    });
});
