'use strict';

var extend = require('deep-extend');
var rootGenerator = require('../app/rootGenerator');
var config = require('../config.js');

module.exports = rootGenerator.extend({

  initializing_: function() {
    this.generatorName = __dirname;
    this.config = config.default;
    this.initializing();
  },

  prompting_: function() {
    this.prompting();
  },

  writing_: function() {

    var tplData = { appName: this.appName };
    extend(tplData, this.promptAnswers);

    // Copy almost everything--exclude some paths that we'll handle later based on UI framework selection
    this.customCopy({
      from: this.templatePath('src/**'),
      to: this.destinationPath('src/'),
      ignorePaths: [this.templatePath('src/js/templates/**'), this.templatePath('src/js/components/**')],
      templateValues: tplData
    });

    // Copy templates that are needed regardless of UI framework selection
    this.fs.copy(
      this.templatePath('src/js/templates/common/**'),
      this.destinationPath('src/js/templates')
    );

    // Copy files specific to UI framework selection
    let templatesSrcPath = null;
    let componentsSrcPath = null;
    if (this.promptAnswers.uiFramework === 'bootstrap') {
      templatesSrcPath = this.templatePath('src/js/templates/bootstrap/**');
      componentsSrcPath = this.templatePath('src/js/components/bootstrap/**');
    } else if (this.promptAnswers.uiFramework === 'materialdesign') {
      templatesSrcPath = this.templatePath('src/js/templates/material/**');
      componentsSrcPath = this.templatePath('src/js/components/material/**');
    } else {
      templatesSrcPath = this.templatePath('src/js/templates/default/**');
      componentsSrcPath = this.templatePath('src/js/components/default/**');
    }
    this.fs.copy(templatesSrcPath, this.destinationPath('src/js/templates'));
    this.fs.copy(componentsSrcPath, this.destinationPath('src/js/components'));


    this.writing(); // Call rootGenerator.writing()
  },

  install_: function() {
    this.install();
  }

});
