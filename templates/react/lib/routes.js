// routes.js

/*eslint-disable no-unused-vars*/
import React from 'react';
/*eslint-enable no-unused-vars*/
import { Route, IndexRoute } from 'react-router';
<% if (otherFrameworks.redux) { %>
import { routeActions } from 'react-router-redux';
import { store } from './store';
import { MainContainer as Main } from './pages/main';
import { HomeContainer as Home } from './pages/home';
import { LoginContainer as Login } from './pages/login';
<% } else { %>
import auth from './auth/auth';
import Main from './pages/main';
import Home from './pages/home';
import Login from './pages/login';
<% } %>
import About from './pages/about';
import appConfig from './appConfig';

const routes = (
  <Route
    component={Main}
    onEnter={requireAuth}
    path='/'
  >
    <IndexRoute component={Home} />
    <Route
      component={Login}
      path='login'
    />
    <Route
      component={Home}
      path='home'
    />
    <Route
      component={About}
      path='about'
    />
  </Route>
);
<% if (otherFrameworks.redux) { %>
function requireAuth(nextState, replace) {
  if (!appConfig.requireAuthentication) { return; }
  if (nextState.location.pathname !== 'login') {
    store.dispatch(routeActions.push('login'));

    let pathName = nextState.location.pathname;

    if (nextState.location.basename === '') {
      pathName = '/';
    }

    replace({
      pathname: '/login',
      state: { nextPathname: pathName }
    });
  }
}
<% } else { %>
function requireAuth(nextState, replace) {
  if (!appConfig.requireAuthentication) { return; }
  if (nextState.location.pathname !== 'login' && !auth.loggedIn()) {
    replace({
      pathname: '/login',
      state: { nextPathname: nextState.location.pathname }
    });
  }
}
<% } %>
export default routes;
