// appConfig.js

// We have configured SystemJS to load and use a "loader plugin" for CSS files
// (see systemjs/plugin-css in system.config.js). SystemJS will use this plugin
// to load any resources ending in the .css extension (note that you can also
// use syntax like '.txt!text' to explicitly specify which plugin should load
// a resource). For more info see http://stackoverflow.com/a/31620209/62694.
<% if(uiFramework === 'bootstrap') { %>
import 'jquery';
import 'bootstrap';
import 'bootstrap/css/bootstrap.css!';
<% } else if (uiFramework === 'materialdesign') { %>
import 'materialize-css';
import injectTapEventPlugin from 'react-tap-event-plugin';
<% } %>
import 'normalize.css';
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
<% if (uiFramework === 'materialdesign') { %>
injectTapEventPlugin();
<% } %>
