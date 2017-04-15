/**
 * navWrapper.js
 *
 * A high order component for app navigation.
 * 
 */

import React from 'react';
import { Map } from 'immutable';
<% if (!otherFrameworks.redux) { %>
import dispatcher from '../api/dispatcher.js';
<% } %>
/**
 * @param  {ReactClass} ComposedComponent [React component]
 * @return {ReactClass}
 */
export const NavWrapper = ComposedComponent => {

  return React.createClass({

    getInitialState() {
      return {
        user: new Map()
      };
    },
    <% if (otherFrameworks.redux) { %>
    componentWillReceiveProps(nextProps) {
      if (nextProps['user']) {
        this.setState({
          user: nextProps.user
        });
      }
    },
    <% } else { %>
    componentWillMount() {
      dispatcher.subscribe('currentUserChanged', this._onCurrentUserChange, this);
    },

    _onCurrentUserChange(event) {
      this.setState({ user: event.data });
    },
    <% } %>
    _hasUserData() {
      return this.state.user.getIn(['user', 'userData']);
    },

    _hasMessages() {
      return this.state.user.getIn(['user', 'messages']);
    },

    _getUserDisplayName() {
      return `${this.state.user.getIn(['user', 'userData', 'displayName'])}`;
    },

    render() {
      return (
        <ComposedComponent
          getUserDisplayName={() => this._getUserDisplayName()}
          hasMessages={() => this._hasMessages()}
          hasUserData={() => this._hasUserData()}
          user={this.state.user}
        />
      );
    }

  });

};
