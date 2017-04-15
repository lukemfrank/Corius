'use strict';

var path = require('path');
var gulp = require('gulp');
var rename = require('gulp-rename');
var replace = require('gulp-replace');

gulp.task('copyImagesFromJspmModules', function(done) {
  return gulp.src('src/jspm_packages/**/*.{jpeg,jpg,png,tif,gif,svg}')
    .pipe(rename({dirname: ''}))
    .pipe(gulp.dest(global.paths.imgDist + '/jspm'));
});

gulp.task('rewriteBundledCssUrlsForJspmImages', function() {
  // To study/test this pattern see http://www.regexpal.com/?fam=93954
  var pattern = /url\(\.\.\/src\/jspm_packages\/[^;]*?([^\/]+)(jpeg|jpg|png|tif|gif|svg)/g
  return gulp.src(global.paths.vendorCssMin)
    .pipe(replace(pattern, "url(../img/jspm/$1$2"))
    .pipe(gulp.dest(global.paths.cssDist));
});

gulp.task('images', function(done) {
  return gulp.src(global.paths.imgSrc)
    .pipe(gulp.dest(global.paths.imgDist));
});
