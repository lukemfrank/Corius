'use strict';

var gulp = require('gulp');
var cache = require('gulp-cached');
var eslint = require('gulp-eslint');
<% if (cssFramework === 'sass') { %>
var scsslint = require('gulp-scss-lint');
<% } else if (cssFramework === 'less') { %>
var less = require('gulp-less');
<% } else { %>
var recess = require('gulp-recess');
<% } %>

// Lint JS.
gulp.task('lintjs', function() {
  return gulp.src(global.paths.jsSrc)
    .pipe(cache('lintjs'))
    .pipe(eslint().on('error', global.onError))
    .pipe(eslint.format());
});

<% if (cssFramework === 'sass') { %>
// Lint SASS.
gulp.task('lintsass', function() {
  return gulp.src(global.paths.sassSrc)
    .pipe(cache('lintsass'))
    .pipe(scsslint().on('error', global.onError));
});
<% } else if (cssFramework === 'less') { %>
// Lint LESS.
gulp.task('lintless', function() {
  return gulp.src(global.paths.lessSrc)
    .pipe(cache('lintless'))
    .pipe(less().on('error', global.onError));
});
<% } else { %>
// Lint CSS.
gulp.task('lintcss', function() {
  return gulp.src(global.paths.cssSrc)
    .pipe(cache('lintcss'))
    .pipe(recess().on('error', global.onError))
    .pipe(recess.reporter());
});
<% } %>

// Lint all the things!
var sequence = ['lintjs'];
<% if (cssFramework === 'sass') { %>
sequence.push('lintsass');
<% } else if (cssFramework === 'less') { %>
sequence.push('lintless');
<% } else { %>
sequence.push('lintcss');
<% } %>

gulp.task('lint', sequence);
