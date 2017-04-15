'use strict';

var gulp = require('gulp');
var autoprefixer = require('gulp-autoprefixer');
var concat = require('gulp-concat');
var spawn = require('child_process').spawn;
var fs = require('fs');
var del = require('del');
var imagemin = require('gulp-imagemin');
var minifyCss = require('gulp-minify-css');
var minifyHtml = require('gulp-minify-html');
var pngquant = require('imagemin-pngquant');
var replace = require('gulp-replace');
var runSeq = require('run-sequence');
var util = require('gulp-util');

var cssBuildTask = '';

// Execute any preparation steps before the build runs.
gulp.task('buildPrep', function() {
  // add the dist dir if it doesn't exist
  // doing it here rather than the "buildjs" script in package.json in order to keep it simple
  if (!fs.existsSync(global.paths.dist)) fs.mkdirSync(global.paths.dist);
});

// One build task to rule them all.
gulp.task('build', function(done) {
  var preBuild = ['buildPrep'],
    build = [
      'indexHtml',
      'buildImgs',
      'buildJs',
      'fonts',
      'images',
      'copyFontsFromJspmModules',
      'copyImagesFromJspmModules'
    ];
  <% if (jsFramework === 'angular' || jsFramework === 'default') { %>
  preBuild.push('templates');
  <% } %> <% if (uiFramework === 'materialdesign') { %>
  build.push('icons');
  <% } %>
  runSeq('clean', preBuild, build, done);
});

// Build images for distribution.
gulp.task('buildImgs', function() {
  return gulp.src(global.paths.imgSrc)
    .pipe(imagemin({
      progressive: true,
      svgoPlugins: [{removeViewBox: false}],
      use: [pngquant()]
    }))
    .pipe(gulp.dest(global.paths.imgDist));
});

// Build JS for distribution.
gulp.task('buildJs', function(done) {
  // execute script in package.json
  var child = spawn('npm', ['run', 'buildJs']);
  
  // print stdout to screen
  child.stdout.on('data', function(data) { 
    process.stdout.write(data.toString());
  });
  
  // print stderr to screen
  child.stderr.on('data', function(data) {
    process.stdout.write(data.toString());
  });

  return child.on('close', function() {
    /**
     * We're building the application using the following script in package.json:
     * 
     * "buildJs": "jspm bundle-sfx js/app dist/app.min.js --minify --skip-source-maps"
     *
     * and we've configured CSS bundling in system.config.js as follows:
     *
     *   buildCSS: true,
     *   separateCSS: true
     * 
     * This results in app.min.css also being generated.  It contains all CSS files imported
     * via ES6 modules using systemjs/plugin-css https://github.com/systemjs/plugin-css.
     *
     * Therefore app.min.css contains only 3rd party CSS, not our custom CSS files.  As such
     * we are renaming it to vendor.min.css so we can load it separately.
     */
    fs.stat(global.paths.cssMin, function(err, stats) {
      if (err) throw err;
      if (stats && stats.isFile()) {
        fs.mkdir(global.paths.cssDist);
        fs.rename(global.paths.cssMin, global.paths.vendorCssMin);
      }
    });
    <% if (jsFramework === 'angular') { %>
    // clean up temporary template files that were converted into JS modules
    if (process.env.NODE_ENV === 'prod') {
      del(global.paths.templatesSrc + '.js');
    }
    <% } %>
    /**
     * Running these tasks last are important:
     *
     * buildLess - creates a new app.min.css
     * rewriteBundledCssUrlsForJspmFonts and rewriteBundledCssUrlsForJspmImages expect that vendor.min.css to exist
     */
    runSeq(cssBuildTask, 'rewriteBundledCssUrlsForJspmFonts', 'rewriteBundledCssUrlsForJspmImages');
    logMessage('Finished building application.');
    done();
  });
});

<% if (cssFramework === 'sass') { %>
// Build SASS for distribution.
var sass = require('gulp-sass');
cssBuildTask = 'buildSass';
gulp.task(cssBuildTask, function() {
  return gulp.src(global.paths.sassSrc)
    .pipe(sass().on('error', sass.logError))
    .pipe(concat('app.min.css'))
    .pipe(autoprefixer())
    .pipe(minifyCss())
    .pipe(gulp.dest(global.paths.cssDist));
});
<% } else if (cssFramework === 'less') { %>
// Build LESS for distribution.
var less = require('gulp-less');
cssBuildTask = 'buildLess';
gulp.task(cssBuildTask, function() {
  return gulp.src(global.paths.lessSrc)
    .pipe(less().on('error', global.onError))
    .pipe(concat('app.min.css'))
    .pipe(autoprefixer())
    .pipe(minifyCss())
    .pipe(gulp.dest(global.paths.cssDist));
});
<% } else { %>
// Build CSS for distribution.
cssBuildTask = 'buildCss';
gulp.task(cssBuildTask, function() {
  return gulp.src(global.paths.cssSrc)
    .pipe(concat('app.min.css'))
    .pipe(autoprefixer())
    .pipe(minifyCss())
    .pipe(gulp.dest(global.paths.cssDist));
});
<% } %>

function logMessage(message) {
  util.log(
    util.colors.green(message)
  );
}
