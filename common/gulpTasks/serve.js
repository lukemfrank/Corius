'use strict';

var gulp = require('gulp');
var runSeq = require('run-sequence');
var browserSync = require('browser-sync');
var historyApiFallback = require('connect-history-api-fallback');
var path = require('path');
var util = require('gulp-util');

var _browserSync;

// Start local dev server.
gulp.task('serve', function(done) {
  var sequence = [
    'indexHtml',
    'fonts',
    'systemJsConfig',
    'copyFontsFromJspmModules',
    'copyImagesFromJspmModules'
  ];
  <% if (cssFramework === 'sass') { %>
  sequence.push('sass');
  <% } else if (cssFramework === 'less') { %>
  sequence.push('less');
  <% } else {%>
  sequence.push('css');
  <% } %> <% if (uiFramework === 'materialdesign') { %>
  sequence.push('icons');
  <% } %>
  <% if (jsFramework === 'angular' || jsFramework === 'default') { %>
  sequence.push('templates');
  <% } %>
  sequence.push('js');

  runSeq('clean', sequence, 'watch', function() {
    _browserSync = browserSync.create('Dev Server');

    // set serverOptions here due to dependency on global.baseUrl which is
    // set by the baseUrl task in the indexHtml task
    var serverOptions = {
      open: false,
      ui: false,
      notify: false,
      ghostMode: false,
      port: process.env.PORT || 9000,
      server: {
        baseDir: global.paths.dist,
        routes: {
          [global.baseUrl + 'system.config.js']: './src/system.config.js',
          [global.baseUrl + 'jspm_packages']: './src/jspm_packages',
          [global.baseUrl + 'img']: './src/img',
          [global.baseUrl + 'fonts']: './src/fonts'
        }
      },
      middleware: [
        historyApiFallback({
          historyApiFallback: true
        })
      ]
    };

    return _browserSync.init(serverOptions, done);
  });
});

gulp.task('browserSync-reload', function(done) {
  _browserSync.reload();
  done();
});

// Watch for changes.
gulp.task('watch', function() {
  // watch JS changes
  gulp
    .watch([global.paths.jsSrc], function() {
      runSeq(['lintjs', 'js'], 'browserSync-reload');
    })
    .on('change', onChange);

  // watch CSS changes
  var cssPath, cssSequence;
  <% if (cssFramework === 'sass') { %>
  cssPath = global.paths.sassSrc;
  cssSequence = ['lintsass', 'sass'];
  <% } else if (cssFramework === 'less') { %>
  cssPath = global.paths.lessSrc;
  cssSequence = ['lintless', 'less'];
  <% } else { %>
  cssPath = global.paths.cssSrc;
  cssSequence = ['lintcss', 'css'];
  <% } %>
  gulp
    .watch(cssPath, function() {
      runSeq(cssSequence, 'browserSync-reload');
    })
    .on('change', onChange);
  
  // watch HTML/template changes
  var htmlPaths = [global.paths.indexSrc];
  var htmlSequence = ['indexHtml'];

  if (global.paths['templatesSrc']) {
    htmlPaths.push(global.paths.templatesSrc);
    htmlSequence.push('templates');
  }

  gulp
    .watch(htmlPaths, function() {
      runSeq(htmlSequence, 'browserSync-reload');
    })
    .on('change', onChange);
});

function onChange(event) {
  util.log(
    util.colors.green('File ' + event.type + ': ') +
    util.colors.magenta(path.basename(event.path))
  );
}
