'use strict';

var path = require('path');
var gulp = require('gulp');
var rename = require('gulp-rename');
var replace = require('gulp-replace');


gulp.task('fonts', function() {
  return gulp
    .src(global.paths.fontsSrc)
    .pipe(gulp.dest(global.paths.fontsDist));
});

/**
 * This task should be used as part of the production bundling to recursively copy all font files in
 * the jspm_packages folder structure into dist/fonts. This is part of a work-around; unfortunately
 * SystemJS builder (used by jspm bundle and sfx-bundle) currently doesn't handle bundling fonts
 * that are installed as part of other JSPM modules (e.g., npm:material-design-icons-iconfont, 
 * npm:font-awesome, etc).
 * 
 * For future reference, note that the inability for 'jspm bundle-sfx' to automatically bundle
 * CSS asset depenencies like this is an outstanding issue:
 *  - https://github.com/systemjs/plugin-css/issues/61
 *  - https://github.com/systemjs/builder/issues/166
 */
gulp.task('copyFontsFromJspmModules', function(done) {
  return gulp.src('src/jspm_packages/**/*.{eot,svg,ttf,woff,woff2}')
    .pipe(rename({dirname: ''}))
    .pipe(gulp.dest(path.join(global.paths.fontsDist, 'jspm')));
});

/**
 * The bundled CSS file (app.min.css) contains font URLs that will not work in production. For
 * example, if FontAwesome was installed via jspm and is included via SystemJS 'import', the
 * minified CSS will contain something like this:
 * 
 *   url(../src/jspm_packages/npm/font-awesome@4.4.0/fonts/fontawesome-webfont.eot)
 *
 * This URL will not work when the bundled app is deployed to a server. However, this task can be
 * used as a work-around to modify those URLs. In this case we assume that JSPM-installed fonts
 * will exist on the server under 'fonts/jspm/', so the URLs are rewritten as follows, for example:
 * 
 *   url(fonts/jspm/font-awesome@4.4.0/fonts/fontawesome-webfont.eot)
 *
 * FFR, attempts were made to try and manipulate the 'baseURL' argument in package.json and 'rootURL'
 * in system.confgig.js such that 'jspm bundle-sfx' passes arguments to the systemjs css plugin which
 * cause the URLs to be rewritten correctly (i.e., without doing this manual search/replace). For
 * more info see:
 *  - https://github.com/systemjs/plugin-css/issues/11
 *  - https://github.com/systemjs/plugin-css/issues/13
 *  - https://github.com/systemjs/plugin-css/issues/28
 */
gulp.task('rewriteBundledCssUrlsForJspmFonts', function() {
  // To study/test this pattern see http://www.regexpal.com/?fam=93954
  var pattern = /url\(\.\.\/src\/jspm_packages\/[^;]*?([^\/]+)(eot|ttf|woff|woff2|otf)/g;
  return gulp.src(global.paths.vendorCssMin)
    .pipe(replace(pattern, "url(../fonts/jspm/$1$2"))
    .pipe(gulp.dest(global.paths.cssDist));s
});
