'use strict';

var gulp = require('gulp');
var replace = require('gulp-replace');
var yaml = require('gulp-yaml');

/**
 * Get the baseUrl property from a yaml config file. The NODE_ENV environment variable determines
 * which file to load. You can create any NODE_ENV and build file combination as long as they share
 * the same value. For example:
 *
 * NODE_ENV=awesome
 * build.awesome.yaml
 */
gulp.task('baseUrl', function() {
  var env = process.env.NODE_ENV || 'dev';
  return gulp.src(global.paths.buildConfig + '/build.' + env + '.yaml')
    .pipe(yaml())
    .on('data', function(file) {
      var json = JSON.parse(file.contents);
      if (!json['baseUrl']) { return; }
      global.baseUrl = json.baseUrl;
    });
});
