// nav.js

import $ from 'jquery';
import eventBus from '../util/eventBus.js';
import navTpl from '../templates/nav.tpl.html!text';

export default (() => {
  $('#app').append(navTpl);
  $('.dropdown-button').dropdown();

  eventBus.on('currentUserChanged', (event, user) => {
    $('#user-name').text(user.getDisplayName());
  });

  eventBus.on('userNotifications', (event, notificationArr) => {
    let $dropdown = $('#notification-dropdown');
    for(let notification of notificationArr) {
      $dropdown.append(`<li><a href="#">${notification.message}</a></li>`);
    }
  });
})();
