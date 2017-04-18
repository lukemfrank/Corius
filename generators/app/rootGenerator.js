'use strict';

var generators = require('yeoman-generator');
var path = require('path');
var _s = require('underscore.string');
var yosay = require('yosay');
var chalk = require('chalk');
var assign = require('object-assign');
var ejs = require('ejs');
var _ = require('lodash');

module.exports = generators.Base.extend({

  constructor: function() {
    generators.Base.apply(this, arguments);

    this.option('skip-welcome-message', {
      desc: 'Skips the welcome message',
      type: Boolean
    });

    this.option('skip-install', {
      desc: 'Skips the installation of libs',
      type: Boolean
    });

    this.option('skip-install-message', {
      desc: 'Skips the message after the installation of libs',
      type: Boolean
    });

    this.option('skip-app-name-message', {
      desc: 'Skips the app name message',
      type: Boolean
    });

    this.option('app-name', {
      desc: 'Sets the application name',
      type: Boolean
    });
  },

  initializing: function() {
    if (!this.generatorName) {
      throw new Error('generatorName must be defined');
    }

    this.generatorName = this.generatorName.split('/').reverse()[0];
    this.sourceRoot(path.join(__dirname, '../../templates/' + this.generatorName));
    this.appName = this.appName || path.basename(process.cwd());
    this.appName = _s.camelize(_s.slugify(_s.humanize(this.appName)));

    if (!this.options['skip-welcome-message']) {
      this.log(yosay('Welcome to Corius ' + _s.titleize(this.generatorName) + '! Out of the box I include ' + _s.titleize(this.generatorName) + ', JSPM, ES6 (Babel), and Gulp to manage tasks.'));
    }

    if (this.options['app-name']) {
      this.appName = this.options['app-name'];
    }

    this.jsFramework = this.options['jsFramework'] ? this.options['jsFramework'] : '';
  },

  prompting: function() {
    var done = this.async();
    var prompts = [];

    var uiFrameworks = [
      {
        name: 'No',
        value: 'no'
      }
    ];

    var cssFrameworks = [
      {
        name: 'No',
        value: 'no'
      }
    ];

    Array.prototype.push.apply(
      uiFrameworks,
      _.map(this.config.uiFrameworks, function(val) {
        return {
          name: _s.capitalize(val),
          value: val.toLowerCase()
        }
      })
    );

    Array.prototype.push.apply(
      cssFrameworks,
      _.map(this.config.cssFrameworks, function(val) {
        return {
          name: _s.capitalize(val),
          value: val.toLowerCase()
        }
      })
    );

    var otherFrameworks = _.map(this.config.otherFrameworks, function(val) {
      return {
        name: _s.capitalize(val),
        value: val.toLowerCase()
      }
    });

    var otherModules = _.map(this.config.otherModules, function(val) {
      return {
        name: _s.capitalize(val),
        value: val.toLowerCase()
      }
    });

    if (!this.options['skip-app-name-message']) {
      prompts.push(
        {
          type : 'input',
          name : 'appName',
          message : 'Your project name',
          default : this.appName
        }
      );
    }

    prompts.push(
      {
        type: 'list',
        name: 'uiFramework',
        message: 'Would you like to use a UI framework?',
        choices: uiFrameworks
      }, {
        type: 'list',
        name: 'cssFramework',
        message: 'Would you like to use a CSS framework?',
        choices: cssFrameworks
      }
    );

    if (otherFrameworks.length) {
      prompts.push({
        type: 'checkbox',
        name: 'otherFrameworks',
        message: 'Would like to use a state container?',
        choices: otherFrameworks
      });
    }

    if (otherModules.length) {
      prompts.push({
        type: 'checkbox',
        name: 'otherModules',
        message: 'Would you like to include any of these modules?',
        choices: otherModules
      });
    }

    this.prompt(prompts, function (answers) {

      // Make prompt answers available to other parts of the generator.
      this.promptAnswers = answers;

      // Convert otherFrameworks to object literal
      var tempOtherFrameworks = {};
      _.forEach(this.promptAnswers.otherFrameworks, function(val) {
        tempOtherFrameworks[val] = true;
      });
      this.promptAnswers.otherFrameworks = tempOtherFrameworks;

      // Convert modules to object literal
      var tempOtherModules = {};
      _.forEach(this.promptAnswers.otherModules, function(val) {
        tempOtherModules[val] = true;
      });
      this.promptAnswers.otherModules = tempOtherModules;

      // If the app name was not collected via prompt (e.g., a --skip arg was used)
      // then add it manually so following code can always use this.promptAnswers.
      if (!answers.appName) {
        this.promptAnswers.appName = this.appName;
      }

      this.promptAnswers = assign({jsFramework: this.jsFramework}, this.promptAnswers);

      done();
    }.bind(this));
  },

  writing: function() {
    // directories
    // Note: this.directory() copies everything as a template (i.e., any
    // <%= xxx %> EJS variables will be replaced with values
    this.directory('test');

    // root project files
    this.template('_editorconfig', '.editorconfig');
    this.template('_gitignore', '.gitignore');
    this.template('_eslintrc', '.eslintrc');
    this.template('karma.conf.js');

    this.fs.copyTpl(
      this.templatePath('_package.json'),
      this.destinationPath('package.json'),
      assign({appName: this.appName}, this.promptAnswers));

    this.fs.copyTpl(
      this.templatePath('_appConfig.js'),
      this.destinationPath('src/js/appConfig.js'),
      this.promptAnswers);

    this.fs.copyTpl(
      this.templatePath('../../common/gulpfile.js'),
      this.destinationPath('gulpfile.js'),
      this.promptAnswers);

    // copy all Gulp tasks except for those that depend on framework selection
    this.customCopy({
      from: this.templatePath('../../common/gulpTasks/**'),
      to: this.destinationPath('gulpTasks/'),
      ignorePaths: [
        this.templatePath('../../common/gulpTasks/templates.js'),
        this.templatePath('../../common/gulpTasks/sass.js'),
        this.templatePath('../../common/gulpTasks/less.js'),
        this.templatePath('../../common/gulpTasks/css.js')
      ],
      templateValues: this.promptAnswers
    });

    // copy templates Gulp task
    if(this.jsFramework === 'angular' || this.jsFramework === 'default') {
      this.fs.copyTpl(
        this.templatePath('../../common/gulpTasks/templates.js'),
        this.destinationPath('gulpTasks/templates.js'),
        this.promptAnswers);
    }

    // copy CSS transpilers Gulp tasks
    if (this.promptAnswers.cssFramework === 'sass') {
      this.fs.copyTpl(
        this.templatePath('../../common/gulpTasks/sass.js'),
        this.destinationPath('gulpTasks/sass.js'));
    } else if (this.promptAnswers.cssFramework === 'less') {
      this.fs.copyTpl(
        this.templatePath('../../common/gulpTasks/less.js'),
        this.destinationPath('gulpTasks/less.js'));
    } else {
      this.fs.copyTpl(
        this.templatePath('../../common/gulpTasks/css.js'),
        this.destinationPath('gulpTasks/css.js'));
    }

    // copy styles
    var styles = '../../common/css';
    if (this.promptAnswers.cssFramework === 'sass') {
      styles = this.templatePath('../../common/sass');
    } else if (this.promptAnswers.cssFramework === 'less') {
      styles = this.templatePath('../../common/less');
    }
    this.directory(styles, 'src/styles');

    // copy fonts
    this.directory('../../common/fonts', 'fonts');

    // copy images
    this.directory('../../common/img', 'src/img');

    // copy icons
    if (this.promptAnswers.uiFramework === 'materialdesign') {
      this.fs.copyTpl(
        this.templatePath('../../common/gulpTasks/icons.js'),
        this.destinationPath('gulpTasks/icons.js'));
      this.directory('../../common/icons/materialDesign', 'icons/materialDesign');
    }

    // copy build configuration
    this.fs.copyTpl(
      this.templatePath('../../common/buildConfig/build.dev.yaml'),
      this.destinationPath('buildConfig/build.dev.yaml'),
      {appName: this.appName});

    this.fs.copyTpl(
      this.templatePath('../../common/buildConfig/build.prod.yaml'),
      this.destinationPath('buildConfig/build.prod.yaml'),
      {appName: this.appName});

    // Docker
    this.fs.copyTpl(
      this.templatePath('../../docker/Dockerfile'),
      this.destinationPath('Dockerfile'));
    this.fs.copyTpl(
      this.templatePath('../../docker/docker-compose.yml'),
      this.destinationPath('docker-compose.yml'),
      {appName: this.appName.toLowerCase()});
    this.customCopy({
      from: this.templatePath('../../docker'),
      to: this.destinationPath('docker/'),
      ignorePaths: [
        this.templatePath('../../docker/Dockerfile'),
        this.templatePath('../../docker/docker-compose.yml')
      ]
    });

    // Nginx
    this.customCopy({
      from: this.templatePath('../../nginx'),
      to: this.destinationPath('nginx/'),
      ignorePaths: [
        this.templatePath('../../nginx/proxy.conf')
      ]
    });
    this.fs.copyTpl(
      this.templatePath('../../nginx/proxy.conf'),
      this.destinationPath('nginx/proxy.conf'),
      assign(this.promptAnswers, {appName: this.appName.toLowerCase()}));

    this.fs.copyTpl(
      this.templatePath('../../common/README.md'),
      this.destinationPath('README.md'),
      {appName: this.appName});
  },

  install: function() {
    if (this.options['skip-install']) {
      return;
    }

    this.installDependencies({
      bower: false,
      npm: true,
      skipInstall: this.options['skip-install']
    });
  },

  /**
   * Copy files and/or directories using glob patterns while swapping out template placeholders
   * with actual values, and supporting the ability to NOT copy certain paths.
   *
   * Options argument should contain the following properties:
   *  - from: source path (may be a glob pattern)
   *  - to: destination (if source is a glob pattern, this should be a directory)
   *  - ignorePaths: array of (globbed) paths that should NOT be included in the copy
   *  - templateValues: object containing values used to render templates
   *
   * @param  {Object} options - see above
   * @return {void}
   */
  customCopy: function(options) {
    // Based off https://github.com/SBoudrias/mem-fs-editor/blob/master/actions/copy-tpl.js
    this.fs.copy(
      options.from,
      options.to,
      {
        process: function (contents) {
          return ejs.render(contents.toString(), options.templateValues, { filename: options.from });
        },
        globOptions: {
          // Don't copy anything under 'templates'; we'll copy those values later,
          // taking the selected UI framework into account.
          ignore: options.ignorePaths
        }
      }
    );

  }

});
