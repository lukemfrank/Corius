'use strict';

var gulp = require('gulp');
var autoprefixer = require('gulp-autoprefixer');
var concat = require('gulp-concat');
var sourcemaps = require('gulp-sourcemaps');

// Compile CSS with sourcemaps.
gulp.task('css', function() {
  gulp.src(global.paths.cssSrc)
    .pipe(sourcemaps.init())
    .pipe(concat('app.css'))
    .pipe(autoprefixer())
    .pipe(sourcemaps.write('.'))
    .pipe(gulp.dest(global.paths.cssDist));
});
