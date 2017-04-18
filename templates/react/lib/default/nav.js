// nav.js

import React from 'react';
import { Link } from 'react-router';
import { NavWrapper } from './navWrapper';

class Nav extends React.Component {

  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div className="corius-nav">
        <Link
          title="Home"
          to="home"
        >
          <div className="branding">
            <div></div>
          </div>
        </Link>
        <nav>
          <Link
            className="nav-link"
            title="About"
            to="about"
          >
            {'About'}
          </Link>
        </nav>
        {this.props.hasUserData() &&
          <div className="display-name">
            {`Welcome, ${this.props.getUserDisplayName()}`}
          </div>
        }
      </div>
    );
  }

}

Nav.propTypes = {
  getUserDisplayName: React.PropTypes.func,
  hasUserData: React.PropTypes.func,
  user: React.PropTypes.object
};

Nav.defaultProps = {
  user: {}
};

export default NavWrapper(Nav);
