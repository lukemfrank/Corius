// app.js

import 'es6-shim';
import 'jquery';

/**
  The order of modules is important.
  Modules that are dependencies of others should be placed higher up.
**/

import './services/application';
import './services/authentication';
import './controllers/navCtrl';
import './controllers/loginCtrl';
import './controllers/mainCtrl';
import './mainModule';