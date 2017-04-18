// home.js

import $ from 'jquery';
import config from '../appConfig';
import requireAuth from '../auth/requireAuth';
import homeTpl from '../templates/home.tpl.html!text';
import userDepsTpl from '../templates/userDeps.tpl.html!text';
import '../components/nav';

export default requireAuth(() => {
  $('.nav').show();
  $('#app').append(homeTpl);

  let deps = {};
  if (config.includeSass) deps.SASS = 'Sass CSS preprocessor';
  if (config.includeLess) deps.LESS = 'Less CSS preprocessor';
<% if(uiFramework === 'bootstrap') { %>
  deps.Bootstrap = `
    <div class="bootstrap-example">
      <span>HTML, CSS, and JS framework for responsive web projects</span>
    </div>`;
<% } else if(uiFramework === 'materialdesign') { %>
  deps.Materialize = `
    <div class="materialize-example">
      <span>Responseisve CSS and JS framework based on Material Design</span>
    </div>
  `;
<% } %>

  if (Object.keys(deps).length) {
    $('.content').append(userDepsTpl);

    Object.keys(deps).map(key => {
      $('.deps').append(
        `<li>
          <h4>` + key + `</h4>
          <span class="description">` + deps[key] + `</span>
        </li>`
      );
    });
  }
});
