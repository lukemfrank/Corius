// nav.js

import React, { PropTypes } from 'react';
import { Link } from 'react-router';
import { NavWrapper } from './navWrapper';

class Nav extends React.Component {

  static propTypes = {
    getUserDisplayName: PropTypes.func,
    hasMessages: PropTypes.func,
    hasUserData: PropTypes.func,
    message: PropTypes.string,
    user: PropTypes.object
  }

  static defaultProps = {
    message: '',
    user: {}
  }

  _getMessages() {
    return this.props.user.getIn(['user', 'messages']).map(function(message, index) {
      return (
        <li key={index}>
          <a href="#">
            {message.get('message')}
          </a>
        </li>
      );
    });
  }

  render() {
    return (
      <nav className="navbar navbar-default navbar-static-top">
        <div className="container">
          <div className="navbar-header">
            <Link
              className="navbar-brand"
              href="#"
              to="/home"
            >
              <div className="branding">
                <div></div>
              </div>
            </Link>
          </div>
          <div
            className="navbar-collapse collapse"
            id="navbar">
            <ul className="nav navbar-nav">
              <li>
                <Link
                  title="About"
                  to="/about"
                >
                  {'About'}
                </Link>
              </li>
            </ul>
            <ul className="nav navbar-nav navbar-right">
              <li className="dropdown">
                <a
                  aria-expanded="false"
                  aria-haspopup="true"
                  className="dropdown-toggle"
                  data-toggle="dropdown"
                  href="#"
                  role="button"
                >
                  <i className="fa fa-user"></i>
                  <span className="caret"></span>
                </a>
                <ul className="dropdown-menu">
                  <li className="dropdown-header">
                    {this.props.getUserDisplayName()}
                  </li>
                  <li>
                    <a href="#">
                      {'Edit Profile'}
                    </a>
                  </li>
                </ul>
              </li>
              {this.props.hasMessages() &&
                <li className="dropdown">
                  <a
                    aria-expanded="false"
                    aria-haspopup="true"
                    className="dropdown-toggle"
                    data-toggle="dropdown"
                    href="#"
                    role="button"
                  >
                    <i className="fa fa-bell"></i>
                    <span className="caret"></span>
                  </a>
                  <ul className="dropdown-menu">
                    <li className="dropdown-header">
                      {'Messages'}
                    </li>
                    {this._getMessages()}
                  </ul>
                </li>
             }
            </ul>
            <p className="navbar-text navbar-right">
              {this.props.message}
            </p>
          </div>
        </div>
      </nav>
    );
  }

}

export default NavWrapper(Nav);
