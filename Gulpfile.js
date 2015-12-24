'use strict';

var gulp = require('gulp');
var nodemon = require('gulp-nodemon');

gulp.task('develop', () => {
  nodemon({ script: 'bin/www',
  ext: 'html js' })
    .on('restart', () => {
        console.log('reloaded');
    });
});
