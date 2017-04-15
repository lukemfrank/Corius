// nav.js

import React, { PropTypes } from 'react';
import { Link } from 'react-router';

import { IconButton } from 'material-ui';
import IconMenu from 'material-ui/lib/menus/icon-menu';
import MenuItem from 'material-ui/lib/menus/menu-item';
import ExpandMoreIcon from 'material-ui/lib/svg-icons/navigation/expand-more';
import Toolbar from 'material-ui/lib/toolbar/toolbar';
import ToolbarGroup from 'material-ui/lib/toolbar/toolbar-group';

import { NavWrapper } from './navWrapper';

class Nav extends React.Component {

  static propTypes = {
    getUserDisplayName: PropTypes.func,
    hasMessages: PropTypes.func,
    hasUserData: PropTypes.func,
    user: PropTypes.object
  }

  static defaultProps = {
    user: {}
  }

  _getMessages() {
    return this.props.user.getIn(['user', 'messages']).map((message, index) => {
      return (
        <MenuItem
          key={index} 
          primaryText={message.get('message')} 
        />
      );
    });
  }

  render() {
    return(
      <Toolbar
        className="corius-nav"
        style={{
          background: '#333',
          padding: '0'
        }}
      >
        <Link
          title="Home"
          to="home"
        >
          <div className="branding">
            <div></div>
          </div>
        </Link>
        <Link
          className="nav-link"
          title="About"
          to="about"
        >
          {'About'}
        </Link>
        <ToolbarGroup float="right">
          {this.props.hasUserData() &&
            <IconMenu
              iconButtonElement={
                <IconButton iconStyle={{fill: '#fff'}}>
                  <ExpandMoreIcon />
                </IconButton>
              }
            >
              <div className="menu-title">{this.props.getUserDisplayName()}</div>
              <MenuItem primaryText="Edit Profile" />
            </IconMenu>
          }
          {this.props.hasMessages() &&
            <IconMenu
              iconButtonElement={
                <IconButton iconStyle={{fill: '#fff'}}>
                  <ExpandMoreIcon />
                </IconButton>
              }
            >
              <div className="menu-title">{'Messages'}</div>
              <div className="messages">
                {this._getMessages()}
              </div>
            </IconMenu>
          }
        </ToolbarGroup>
      </Toolbar>
    );
  }
  
}

export default NavWrapper(Nav);
