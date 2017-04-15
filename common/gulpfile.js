'use strict';

/*
 * gulpfile.js
 * ===========
 * Rather than manage one giant configuration file responsible
 * for creating multiple tasks, each task has been broken out into
 * its own file in the 'gulpTasks' folder. Any files in that directory get
 * automatically required below.
 *
 * To add a new task, simply add a new task file in that directory.
 */

var gulp = require('gulp');
var requireDir = require('require-dir');
var util = require('gulp-util');

// Specify paths & globbing patterns for tasks.
global.paths = {
  <% if (cssFramework === 'sass') { %>
  // SASS
  sassSrc: './src/styles/**/*.scss',
  <% } else if (cssFramework === 'less') { %>
  // LESS
  lessSrc: './src/styles/**/*.less',
  <% } else { %>
  // CSS
  cssSrc: './src/styles/**/*.css',
  <% } %>
  <% if (jsFramework === 'angular' || jsFramework === 'default') { %>
  // Templates
  templatesSrc: './src/js/templates/**/*',
  templatesDist: './dist/js/templates',
  <% } %> <% if (uiFramework === 'materialdesign') { %>
  // Icons
  iconsSrc: './icons/**/*',
  iconsDist: './dist/icons',
  <% } %>
  // JS
  jsSrc: './src/js/**/*.js',
  jsDist: './dist/js',
  // Images
  imgSrc: './src/img/**/*',
  imgDist: './dist/img',
  // index.html
  indexSrc: './src/index.html',
  // Fonts
  fontsSrc: './fonts/**/*',
  fontsDist: './dist/fonts',
  // CSS path used with dev server
  cssDist: './dist/css',
  // Minified CSS for distribution
  cssMin: './dist/app.min.css',
  // Minified Vendor CSS bundle
  vendorCssMin: './dist/css/vendor.min.css',
  // Distribution folder
  dist: './dist',
  // SystemJS config
  systemJsConfig: './src/system.config.js',
  // Build config files
  buildConfig: './buildConfig'
};

// Require all tasks in the 'gulpTasks' folder.
requireDir('./gulpTasks', { recurse: false });

// Default task; start local server.
gulp.task('default', ['serve']);

global.onError = function(error) {
  util.log(util.colors.red(error.message));
  this.emit('end');
}
