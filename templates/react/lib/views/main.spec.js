// main.spec.js

import React from 'react';
import ReactDOM from 'react';
import { Map } from 'immutable';
<% if (otherFrameworks.redux) { %>
import { Main } from 'src/js/views/main';
<% } else { %>
import Main from 'src/js/views/main';<% } %>

describe('main', function() {

  let node;
  const props = {user: Map({})};

  const FirstChild = React.createClass({
    render() {
      return (<div className="foo"></div>)
    }
  });

  const SecondChild = React.createClass({
    render() {
      return (<div className="bar"></div>)
    }
  });

  beforeEach(function() {
    node = document.createElement('div');
  });

  afterEach(function() {
    React.unmountComponentAtNode(node);
  });

  it('renders the navigation component', function() {
    expect(document.getElementsByClassName('nav')).to.be.present;
  });

  it('renders its child components', function() {
    const main = ReactDOM.render(
      <Main {...props}>
        <FirstChild />
        <SecondChild />
      </Main>
    , node);
    expect(main.props.children.length).to.eql(2);
  });

});
