// appConfig.js

<% if(uiFramework === 'bootstrap') { %>
import 'bootstrap';
import 'bootstrap/css/bootstrap.css!';
<% } else if(uiFramework === 'materialdesign') { %>
import 'dogfalo/materialize/bin/materialize.css!css';
<% } %>
import 'font-awesome';
// Some packages log to the console which causes errors in IE9, unless the dev tools are open
import 'console-polyfill';

// Service endpoints are proxied through to Nginx. Ensure that the reverse proxy
// location block exists and is configured to the right destination.
export default {
  userServiceEndpoint: '/service/userservice/1.0',
  requestTimeout: 15000,
  requireAuthentication: true
};
