// listItem.js

import React, { PropTypes } from 'react';

export default class ListItem extends React.Component {

  static propTypes = {
    children: PropTypes.object,
    description: PropTypes.string,
    name: PropTypes.string
  }

  static defaultProps = {
    description: '',
    name: ''
  }

  render() {
    return (
      <li>
        <h4>{this.props.name}</h4>
        <span className="description">
          {this.props.description}{this.props.children}
        </span>
      </li>
    );
  }

}
