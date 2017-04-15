'use strict';

var gulp = require('gulp');

gulp.task('templates', function() {
  return gulp
    .src(global.paths.templatesSrc)
    .pipe(gulp.dest(global.paths.templatesDist));
});
