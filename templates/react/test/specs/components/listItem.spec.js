// listItem.spec.js

import ListItem from 'src/js/components/listItem';
import React from 'react/addons';
import TestUtils from 'react/lib/ReactTestUtils';

describe('listItem', function() {

  let listItem = TestUtils.renderIntoDocument(<ListItem name='foo' description='bar' />);

  it('renders', function() {
    let title = TestUtils.findRenderedDOMComponentWithTag(listItem, 'h4').getDOMNode();
    expect(title.innerHTML).to.contain('foo');

    let description = TestUtils.findRenderedDOMComponentWithTag(listItem, 'span').getDOMNode();
    expect(description.innerHTML).to.contain('bar');
  });

});
