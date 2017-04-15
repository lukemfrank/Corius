// login.js

import React, { PropTypes } from 'react';

<% if (!otherFrameworks.redux) { %>
import auth from '../auth/auth';
import dispatcher from '../api/dispatcher';
<% } else if (otherFrameworks.redux) { %>
import { connect } from 'react-redux';
import { routeActions } from 'react-router-redux';
import { fetchUserIfNeeded } from '../reducers/user';
<% } %>
export default class Login extends React.Component {
  <% if (otherFrameworks.redux) { %>
  static propTypes = {
    dispatch: PropTypes.object
  }

  constructor(props) {
    super(props);
    this.state = {
      message: ''
    };
  }

  componentWillMount() {
    this.setState({message: 'Logging in...'});
    this.props.dispatch(fetchUserIfNeeded);
  }

  componentWillReceiveProps(nextProps) {
    if (!nextProps.user.get('user')) { return; }
    this._setStateOnAuth(nextProps);
  }

  _setStateOnAuth(props) {
    const { location, dispatch, user } = props;
    if (user.getIn(['user', 'userData'])) {
      // setting user to sessionStorage
      sessionStorage.setItem('currentUser', JSON.stringify(user.getIn(['user', 'userData']).toJSON()));
      sessionStorage.setItem('currentUserNotifications', JSON.stringify(user.getIn(['user', 'messages']).toJSON()));
      // if the user entered the app from a specific route then redirect them to that route
      if (location.state && location.state.nextPathname) {
        dispatch(routeActions.replace(location.state.nextPathname));
      // otherwise if the user entered from the root then redirect them to home
      } else {
        dispatch(routeActions.replace('home'));
      }
    } else {
      if (user.getIn(['user', 'errors'])) {
        let errMsg = '';
        let size = user.getIn(['user', 'errors']).size;

        user.getIn(['user', 'errors']).map((error, i) => {
          errMsg += `${error.get('message')}`;
          if (size > i) { errMsg += ' '; }
        });

        this.setState({message: `${errMsg}`});
      }
      // if the user hit /login directly then re-route them to /home which will run them
      // through the login process
      if (!location.state) {
        dispatch(routeActions.replace('home'));
      }
    }
  }
  <% } else { %>
  static propTypes = {
    location: PropTypes.object,
  }

  static contextTypes = {
    router: PropTypes.object.isRequired
  }

  componentWillMount() {
    this.setState({message: 'Logging in...'});
    dispatcher.subscribe('currentUserChanged', this._setUserSession);
    auth.onChange = this._setStateOnAuth.bind(this);
    auth.login();
  }

  _setUserSession(event) {
    let data = event.data.toJSON();
    sessionStorage.setItem('currentUser', JSON.stringify(data.user.userData));
    sessionStorage.setItem('currentUserNotifications', JSON.stringify(data.user.messages));
  }

  _setStateOnAuth(userExists, errorMessage) {
    if (userExists) {
      const { location } = this.props;
      const { router } = this.context;
      location.state && location.state.nextPathname ? router.replace(location.state.nextPathname) : router.replace('/home');
    } else {
      this.setState({message: `Login failed. (Details: ${errorMessage})`});
    }
  }
  <% } %>
  render() {
    return (
      <div className="login">
        <div className="message">{this.state.message}</div>
      </div>
    );
  }

}
<% if (otherFrameworks.redux) { %>

function mapStateToProps(state) {
  const { user, dispatch } = state;
  return {
    user,
    dispatch
  };
}

const LoginContainer = connect(mapStateToProps)(Login);
export default LoginContainer;
<% } %>
