// login.js

import $ from 'jquery';
import auth from '../auth/auth';
import loginTpl from '../templates/login.tpl.html!text';

export default (successCallback) => {
  $('#app').append(loginTpl);
  $('.nav').hide();

  auth.login()
    .then(() => {
      $('.login').remove();
      successCallback();
    })
    .catch(error => {
      let errMsg = '';
      if(error.json) {
        error.json.errors.map(err => { errMsg += ` ${err.message}`; });
      }

      $('.message').text('Login failed. (Details: '+errMsg+')');
    });
};
