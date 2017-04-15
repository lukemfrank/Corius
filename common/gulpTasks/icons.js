'use strict';

var gulp = require('gulp');

gulp.task('icons', function() {
  return gulp
    .src(global.paths.iconsSrc)
    .pipe(gulp.dest(global.paths.iconsDist));
});
