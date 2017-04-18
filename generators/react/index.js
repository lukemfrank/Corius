'use strict';

var rootGenerator = require('../app/rootGenerator');
var config = require('../config.js');

module.exports = rootGenerator.extend({

  initializing_: function() {
    this.generatorName = __dirname;
    this.config = config.react;
    this.initializing();
  },

  prompting_: function() {
    this.prompting();
  },

  writing_: function() {
    this.fs.copyTpl(
      this.templatePath('lib/content.js'),
      this.destinationPath('src/js/components/content.js'),
      this.promptAnswers);

    this.fs.copyTpl(
      this.templatePath('lib/content.spec.js'),
      this.destinationPath('test/specs/components/content.spec.js'),
      this.promptAnswers);

    this.fs.copyTpl(
      this.templatePath('lib/routes.js'),
      this.destinationPath('src/js/routes.js'),
      this.promptAnswers);

    this.fs.copyTpl(
      this.templatePath('lib/routes.spec.js'),
      this.destinationPath('test/specs/routes.spec.js'),
      this.promptAnswers);

    this.fs.copyTpl(
      this.templatePath('lib/app.js'),
      this.destinationPath('src/js/app.js'),
      this.promptAnswers);

    this.fs.copyTpl(
      this.templatePath('lib/views/main.js'),
      this.destinationPath('src/js/views/main.js'),
      this.promptAnswers);

    this.fs.copyTpl(
      this.templatePath('lib/views/main.spec.js'),
      this.destinationPath('test/specs/views/main.spec.js'),
      this.promptAnswers);

    this.fs.copyTpl(
      this.templatePath('lib/views/login.js'),
      this.destinationPath('src/js/views/login.js'),
      this.promptAnswers);

    this.fs.copyTpl(
      this.templatePath('lib/components/navWrapper.js'),
      this.destinationPath('src/js/components/navWrapper.js'),
      this.promptAnswers);

    this.fs.copyTpl(
      this.templatePath('lib/api/message.js'),
      this.destinationPath('src/js/api/message.js'));

    this.fs.copyTpl(
      this.templatePath('lib/api/user.js'),
      this.destinationPath('src/js/api/user.js'));

    if (this.promptAnswers.uiFramework === 'bootstrap') {
      this.fs.copyTpl(
        this.templatePath('lib/bootstrap/nav.js'),
        this.destinationPath('src/js/components/nav.js'),
        this.promptAnswers);
    } else if (this.promptAnswers.uiFramework === 'materialdesign') {
      this.fs.copyTpl(
        this.templatePath('lib/materialDesign/nav.js'),
        this.destinationPath('src/js/components/nav.js'),
        this.promptAnswers);
    } else {
      this.fs.copyTpl(
        this.templatePath('lib/default/nav.js'),
        this.destinationPath('src/js/components/nav.js'),
        this.promptAnswers);
    }

    this.fs.copyTpl(
      this.templatePath('lib/nav.spec.js'),
      this.destinationPath('test/specs/components/nav.spec.js'),
      this.promptAnswers);

    if (!this.promptAnswers.otherFrameworks.redux) {
      this.fs.copyTpl(
        this.templatePath('lib/api/dispatcher.js'),
        this.destinationPath('src/js/api/dispatcher.js'));

      this.directory('lib/auth', 'src/js/auth');
    }

    if (this.promptAnswers.otherFrameworks.redux) {
      this.fs.copyTpl(
        this.templatePath('lib/redux/store.js'),
        this.destinationPath('src/js/store.js'),
        this.promptAnswers);

      this.directory('lib/redux/reducers', 'src/js/reducers');
    }

    this.fs.copyTpl(
      this.templatePath('lib/api/api.js'),
      this.destinationPath('src/js/api/api.js'),
      this.promptAnswers);

    // Note: this.directory() copies everything as a template (i.e., any 
    // <%= xxx %> EJS variables will be replaced with values
    // this.directory('src');
    this.directory('src');
    
    this.writing();
  },

  install_: function() {
    this.install();
  }

});
