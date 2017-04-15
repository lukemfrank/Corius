'use strict';

var rootGenerator = require('../app/rootGenerator');
var config = require('../config.js');

module.exports = rootGenerator.extend({

  initializing_: function() {
    this.generatorName = __dirname;
    this.config = config.angular;
    this.initializing();
  },

  prompting_: function() {
    this.prompting();
  },

  writing_: function() {
    this.fs.copyTpl(
      this.templatePath('_index.html'),
      this.destinationPath('src/index.html'),
      this.promptAnswers);

    this.fs.copyTpl(
      this.templatePath('lib/mainModule.js'),
      this.destinationPath('src/js/mainModule.js'),
      this.promptAnswers);

    this.fs.copyTpl(
      this.templatePath('lib/controllers/mainCtrl.js'),
      this.destinationPath('src/js/controllers/mainCtrl.js'),
      this.promptAnswers);

    if (this.promptAnswers.uiFramework === 'bootstrap') {
    this.fs.copyTpl(
      this.templatePath('lib/templates/bootstrap/nav.tpl.html'),
      this.destinationPath('src/js/templates/nav.tpl.html'),
      this.promptAnswers);
    } else if (this.promptAnswers.uiFramework === 'materialdesign') {
    this.fs.copyTpl(
      this.templatePath('lib/templates/materialDesign/nav.tpl.html'),
      this.destinationPath('src/js/templates/nav.tpl.html'),
      this.promptAnswers);
    } else {
    this.fs.copyTpl(
      this.templatePath('lib/templates/default/nav.tpl.html'),
      this.destinationPath('src/js/templates/nav.tpl.html'),
      this.promptAnswers);
    }

    // Note: this.directory() copies everything as a template (i.e., any 
    // <%= xxx %> EJS variables will be replaced with values
    this.directory('src');
    
    this.writing();
  },

  install_: function() {
    this.install();
  }

});
