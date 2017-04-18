// home.spec.js

import Home from 'src/js/views/home';
import React from 'react';

describe('home', function() {

  let node;

  beforeEach(function() {
    node = document.createElement('div');
  });

  afterEach(function() {
    React.unmountComponentAtNode(node);
  });

  it('renders the Content child component', function() {
    React.render(<Home />, node);
    expect(node.innerHTML).to.contain('Corius - UI application scaffold.');
  });

});
