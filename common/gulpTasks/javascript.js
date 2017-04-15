'use strict';

var gulp = require('gulp');

gulp.task('js', function() {
  return gulp
    .src(global.paths.jsSrc)
    .pipe(gulp.dest(global.paths.jsDist));
});
