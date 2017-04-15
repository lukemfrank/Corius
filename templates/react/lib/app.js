// app.js

import 'es6-shim';
/*eslint-disable no-unused-vars*/
import React from 'react';
/*eslint-enable no-unused-vars*/
import ReactDOM from 'react-dom';
import routes from './routes';
<% if (otherFrameworks.redux) { %>
import { Router } from 'react-router';
import { Provider } from 'react-redux';
import { store, history } from './store';

ReactDOM.render(
  <Provider store={store}>
    <Router
      history={history}
      routes={routes}
    />
  </Provider>,
  document.getElementById('app')
);
<% } else { %>
import { Router, useRouterHistory } from 'react-router';
import { createHistory } from 'history';

// global variable arriving from index.html
const base = document.getElementsByTagName('base')[0];
const BASE_URL = base.attributes[0].value;

// manually create history using a custom basename configuration, this will ensure
// that all routes will be run relative to the value of BASE_URL
const history = useRouterHistory(createHistory)({
  basename: BASE_URL
});

ReactDOM.render(
  <Router
    history={history}
    routes={routes}
  />,
  document.getElementById('app')
);
<% } %>