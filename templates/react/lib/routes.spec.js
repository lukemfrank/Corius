// routes.spec.js
 
import React from 'react';
import ReactDOM from 'react-dom';
import TestUtils from 'react/lib/ReactTestUtils';
<% if (otherFrameworks.redux) { %>
import { Provider } from 'react-redux';
import { Router } from 'react-router';
import { routeActions } from 'react-router-redux';
import { store, history } from 'src/js/store';
<% } else { %>
import auth from 'src/js/auth/auth';
import { Router, browserHistory } from 'react-router';
<% } %>
import routes from 'src/js/routes';
import appConfig from 'src/js/appConfig';

describe('routes', function() {

  let node;
  
  beforeEach(function() {
    node = document.createElement('div');
  });

  afterEach(function() {
    React.unmountComponentAtNode(node);
  });

  <% if (otherFrameworks.redux) { %>
  const routeTest = function(route, stringToTest, done) {
    ReactDOM.render((
      <Provider store={store}>
        <Router
          history={history}
          routes={routes}
        />
      </Provider>
    ), node, function() {
      store.dispatch(routeActions.replace(route));
      expect(node.innerHTML).to.contain(stringToTest);
      done();
    });
  };

  describe('with authentication', function() {
    beforeEach(function() {
      appConfig.requireAuthentication = true;
    });

    afterEach(function() {
      appConfig.requireAuthentication = false;
    });

    describe('default route', function() {
      it('renders the home component', function(done) {
        routeTest('/home', 'Logging in...', done);
      });
    });
  });

  describe('when user has been authenticated', function() {
    beforeEach(function() {
      appConfig.requireAuthentication = false;
    });

    afterEach(function() {
      appConfig.requireAuthentication = true;
    });

    describe('default route', function() {
      it('renders the home component', function(done) {
        routeTest('/', 'Corius - UI application scaffold.', done);
      });
    });

    describe('/home route', function() {
      it('renders the home component', function(done) {
        routeTest('/home', 'Corius - UI application scaffold.', done);
      });
    });

    describe('/about route', function() {
      it('renders the about component', function(done) {
        routeTest('/about', 'About Page.', done);
      });
    });
  });
  <% } else { %>
  const routeTest = function(route, stringToTest, done) {
    const router = ReactDOM.render((
      <Router
       history={browserHistory}
       routes={routes}
      />
    ), node, function() {
      this.router.replace(route);
      expect(node.innerHTML).to.contain(stringToTest);
      done();
    });

  };
  
  describe('with authentication', function() {
    beforeEach(function() {
      appConfig.requireAuthentication = true;
    });

    afterEach(function() {
      appConfig.requireAuthentication = false;
    });

    describe('default route', function() {
      it('redirects to the Login component', function(done) {
        routeTest('/home', 'Logging in...', done);
      });
    });

  });

  describe('when user has been authenticated', function() {
    beforeEach(function() {
      appConfig.requireAuthentication = false;
    });

    afterEach(function() {
      appConfig.requireAuthentication = true;
    });

    describe('default route', function() {
      it('renders the Home component', function(done) {
        routeTest('/', 'Corius - UI application scaffold.', done);
      });
    });

    describe('/home route', function() {
      it('renders the Home component', function(done) {
        routeTest('/home', 'Corius - UI application scaffold.', done);
      });
    });

    describe('/about route', function() {
      it('renders the About component', function(done) {
        routeTest('/about', 'About Page.', done);
      });
    });
  });
  <% } %>
});
