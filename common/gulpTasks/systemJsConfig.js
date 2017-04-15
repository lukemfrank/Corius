'use strict';

var gulp = require('gulp');
var replace = require('gulp-replace');

/**
 * The purpose of this Gulp task is to copy over system.config.js with a modified baseURL. This is only
 * used when running the dev server. The reason we are doing this is because the baseURL value needs to be ""
 * for Karma tests to resolve jspm_packages but "/" for the browser to resolve jspm_packages. A single configuration
 * that worked for both Karma and the browser became very time consuming and ultimately it was decided to use this workaround.
 */
gulp.task('systemJsConfig', function() {
  return gulp.src(global.paths.systemJsConfig)
    .pipe(replace('baseURL: ""', 'baseURL: "/"'))
    .pipe(gulp.dest(global.paths.dist));
});
