// Karma configuration

module.exports = function(config) {
  config.set({

    // base path that will be used to resolve all patterns (eg. files, exclude)
    basePath: '',

    // frameworks to use
    // available frameworks: https://npmjs.org/browse/keyword/karma-adapter
    frameworks: [
      'jspm',
      'mocha',
      'chai-as-promised',
      'sinon-chai'
    ],

    // start these browsers
    // available browser launchers: https://npmjs.org/browse/keyword/karma-launcher
    browsers: ['PhantomJS'],

    // test results reporter to use
    // possible values: 'dots', 'progress'
    // available reporters: https://npmjs.org/browse/keyword/karma-reporter
    reporters: [
      'mocha',
      'progress',
      'verbose',
      'coverage'
    ],

    // Continuous Integration mode
    // if true, Karma captures browsers, runs the tests and exits
    singleRun: true,

    // enable / disable watching file and executing tests whenever any file changes
    autoWatch: false,

    // enable / disable colors in the output (reporters and logs)
    colors: true,

    // list of files / patterns to load in the browser
    files: [],

    // configuration for karma-jspm
    jspm: {
      useBundles: true,
      config: 'src/system.config.js',
      loadFiles: [
        'test/setup.js',
        'test/**/*.js'
      ],
      serveFiles: ['src/js/**/*.js'],
      packages: 'src/jspm_packages'
    },

    proxies: {
      '/base/jspm_packages/': '/base/src/jspm_packages/'
    },

    // list of files to exclude
    exclude: [],

    // level of logging
    // possible values: config.LOG_DISABLE || config.LOG_ERROR || config.LOG_WARN || config.LOG_INFO || config.LOG_DEBUG
    logLevel: config.LOG_INFO,

    // preprocess matching files before serving them to the browser
    // available preprocessors: https://npmjs.org/browse/keyword/karma-preprocessor
    preprocessors: {
      'src/js/**/*.js': ['babel'],
      'test/**/*.js': ['babel', 'coverage']
    },

    'babelPreprocessor': {
      options: {
        optional: [
          'es7.classProperties',
          'es7.decorators'
        ],
        sourceMap: 'inline'
      }
    },

    // optionally, configure the reporter
    coverageReporter: {
      type : 'html',
      dir : 'coverage/'
    }

  });
};
