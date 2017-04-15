'use strict';

var gulp = require('gulp');
var replace = require('gulp-replace');
var minify = require('gulp-minify-html');
var runSeq = require('run-sequence');

gulp.task('indexHtml', function() {
  runSeq('baseUrl', 'buildHtml');
});

gulp.task('buildHtml', function() {
  if (process.env.NODE_ENV === 'prod') {
    // Prepare index.html for production
    return gulp.src(global.paths.indexSrc)
      .pipe(replaceBaseUrl())
      .pipe(replace('jspm_packages/system.js', 'app.min.js'))
      .pipe(replace('<script src="system.config.js"></script>', ''))
      .pipe(replace("<script>System.import('js/app')</script>", ''))
      .pipe(replace('<!-- DEV START -->', '<!-- DEV START'))
      .pipe(replace('<!-- DEV END -->', 'DEV END -->'))
      .pipe(replace('<!-- PROD START', ''))
      .pipe(replace('PROD END -->', ''))
      .pipe(minify())
      .pipe(gulp.dest(global.paths.dist));
  } else {
    return gulp
      .src(global.paths.indexSrc)
      .pipe(replaceBaseUrl())
      .pipe(gulp.dest(global.paths.dist));
  }
});

function replaceBaseUrl() {
  return replace(/{{baseUrl}}/g, global.baseUrl);
}