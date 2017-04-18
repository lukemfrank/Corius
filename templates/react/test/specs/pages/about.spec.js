// about.spec.js

import About from 'src/js/views/about';
import React from 'react';

describe('about', function() {

  let node;

  beforeEach(function() {
    node = document.createElement('div');
  });

  afterEach(function() {
    React.unmountComponentAtNode(node);
  });

  it('renders', function() {
    React.render(<About />, node);
    expect(node.innerHTML).to.contain('About Page.');
  });

});
