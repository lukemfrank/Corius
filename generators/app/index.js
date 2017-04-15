'use strict';

var generators = require('yeoman-generator');
var path = require('path');
var _s = require('underscore.string');
var yosay = require('yosay');
var chalk = require('chalk');

module.exports = generators.Base.extend({
  constructor: function() {
    generators.Base.apply(this, arguments);

    this.option('skip-welcome-message', {
      desc: 'Skips the welcome message',
      type: Boolean
    });

    this.option('skip-install', {
      desc: 'Skips the installation of dependencies',
      type: Boolean
    });

    this.option('skip-install-message', {
      desc: 'Skips the message after the installation of dependencies',
      type: Boolean
    });
  },

  initializing: function() {
    this.appname = this.appname || path.basename(process.cwd());
    this.appname = _s.camelize(_s.slugify(_s.humanize(this.appname)));

    this.jsFramework = '';

    if (!this.options['skip-welcome-message']) {
      this.log(yosay('Welcome to Corius! I will walk you through setting up a new application.'));
    }
  },

  askFor: function () {
    var done = this.async();

    var prompts = [
      {
        type : 'input',
        name : 'appName',
        message : 'Your project name',
        default : this.appname
      }, {
        type: 'list',
        name: 'jsFramework',
        message: 'Would you like to use a JS framework?',
        choices: [
          {
            name: 'No',
            value: 'default'
          }, {
            name: 'React',
            value: 'react'
          }, {
            name: 'Angular',
            value: 'angular'
          }
        ]
      }
    ];

    this.prompt(prompts, function (props) {
      this.jsFramework = props.jsFramework;

      if (props.appName) {
        this.appName = props.appName;
      }

      this.jsFramework = props.jsFramework;

      done();
    }.bind(this));
  },

  install: function() {
    if (this.options['skip-install']) {
      return;
    }

    if (this.jsFramework === 'angular') {
      this.composeWith('corius:angular', { 
        options: {
          'skip-app-name-message': true,
          'skip-welcome-message': true,
          'app-name': this.appName,
          'jsFramework' : this.jsFramework
        }
      });
    } else if (this.jsFramework === 'react') {
      this.composeWith('corius:react', { 
        options: {
          'skip-app-name-message': true,
          'skip-welcome-message': true,
          'app-name': this.appName,
          'jsFramework' : this.jsFramework
        }
      });
    } else {
      this.composeWith('corius:default', { 
        options: {
          'skip-app-name-message': true,
          'skip-welcome-message': true,
          'app-name': this.appName,
          'jsFramework' : this.jsFramework
        }
      });
    }
  }
});
