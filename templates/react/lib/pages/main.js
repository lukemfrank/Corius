// main.js

import React, { PropTypes } from 'react';
import Nav from '../components/nav';
<% if (otherFrameworks.redux) { %>
import { connect } from 'react-redux';
<% } %>
class Main extends React.Component {
  
  static propTypes = {
    children: PropTypes.object
  }

  render() {
    return (
      <div>
        <Nav {...this.props} />
        <div className="main">
          {this.props.children}
        </div>
      </div>
    );
  }

}
<% if (otherFrameworks.redux) { %>
function mapStateToProps(state) {
  return {
    user: state.user
  };
}

const MainContainer = connect(mapStateToProps)(Main);
export { Main, MainContainer };
<% } else { %>
export default Main;
<% } %>
