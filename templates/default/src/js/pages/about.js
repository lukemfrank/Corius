// about.js

import aboutTpl from '../templates/about.tpl.html!text';
import '../components/nav';
import requireAuth from '../auth/requireAuth';
import $ from 'jquery';

export default requireAuth(() => {
  $('.nav').show();
  $('.display-name').text(localStorage.displayName);
  $('#app').append(aboutTpl);
});
