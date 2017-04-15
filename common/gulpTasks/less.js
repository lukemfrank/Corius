'use strict';

var gulp = require('gulp');
var autoprefixer = require('gulp-autoprefixer');
var concat = require('gulp-concat');
var less = require('gulp-less');
var sourcemaps = require('gulp-sourcemaps');

// Compile LESS with sourcemaps.
gulp.task('less', function() {
  gulp.src(global.paths.lessSrc)
    .pipe(sourcemaps.init())
    .pipe(less().on('error', global.onError))
    .pipe(concat('app.css'))
    .pipe(autoprefixer())
    .pipe(sourcemaps.write('.'))
    .pipe(gulp.dest(global.paths.cssDist));
});
