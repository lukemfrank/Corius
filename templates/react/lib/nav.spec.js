// nav.spec.js

import React from 'react';
import ReactDOM from 'react-dom';
import $ from 'jquery';
import Nav from 'src/js/components/nav';

describe('nav', function() {

  let node;

  beforeEach(function() {
    node = document.createElement('div');
    document.body.appendChild(node);
    ReactDOM.render(<Nav />, node);
  });

  afterEach(function() {
    ReactDOM.unmountComponentAtNode(node);
  });

  describe('renders', function() {

    it('creates 1 link', function() {
      var links = node.getElementsByTagName('a');
      expect(links.length).to.eql(2);
      expect($(links[0]).attr('title')).to.eql('Home');
      expect($(links[1]).attr('title')).to.eql('About');
    });

  });

});
