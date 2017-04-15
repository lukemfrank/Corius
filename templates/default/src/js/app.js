// app.js

import 'es6-shim';
import $ from 'jquery';
import director from 'director';
import about from './pages/about';
import home from './pages/home';
import login from './pages/login';
<% if(uiFramework === 'materialdesign') { %>
import materialize from 'dogfalo/materialize';
<% } %>
export default (() => {
  const routes = {
    '/about': about,
    '/home': home,
    '/login': login
  };

  const reset = () => {
    $('.main').remove();
  };

  const router = new director.Router(routes).configure({before: reset});

  router.init('home');
  <% if(uiFramework === 'materialdesign') { %>
  // We need to manually initialize Waves, the 3rd-pary library that adds the ripple
  // animations to clicked buttons, etc. Note that Materialize includes Waves (which
  // is why it's available as a child property), but it's an older version (0.6.4).
  // If a newer version of Materialize upgrades Waves, displayEffect() might need to
  // be replaced with the new Waves.init() method. 
  // https://github.com/Dogfalo/materialize/issues/2290#issuecomment-165227284
  materialize.Waves.displayEffect();
  <% } %>
})();
