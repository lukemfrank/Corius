// nav.js

import $ from 'jquery';
import eventBus from '../util/eventBus.js';
import navTpl from '../templates/nav.tpl.html!text';

export default (() => {
  $('#app').append(navTpl);

  eventBus.on('currentUserChanged', (event, user) => {
    $('#user-name').text(user.getDisplayName());
  });

  eventBus.on('userNotifications', (event, notificationArr) => {
    for(let notification of notificationArr) {
      alert(notification.message);
    }
  });
})();
