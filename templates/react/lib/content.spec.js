// content.spec.js

import Content from 'src/js/components/content';
import React from 'react/addons';
import TestUtils from 'react/lib/ReactTestUtils';
import $ from 'jquery';

describe('content', function() {

  let content,
      listItems,
      props = {};

  beforeEach(function() {
    content = TestUtils.renderIntoDocument(<Content {...props} />);
    let userDependencies = TestUtils.findRenderedDOMComponentWithClass(content, 'deps').getDOMNode();
    listItems = $(userDependencies).find('li');
  });

  describe('renders', function() {

    it('sets the page title', function() {
      let title = TestUtils.findRenderedDOMComponentWithTag(content, 'h1').getDOMNode();
      expect($(title).text()).to.eql('Corius - UI application scaffold.');
    });

    it('sets the default dependencies', function() {
      listItems = TestUtils.scryRenderedDOMComponentsWithTag(content, 'li');
      expect($(listItems[0].getDOMNode()).find('h4').text()).to.eql('JSPM');
      expect($(listItems[1].getDOMNode()).find('h4').text()).to.eql('ES6');
      expect($(listItems[2].getDOMNode()).find('h4').text()).to.eql('Fetch');
      expect($(listItems[3].getDOMNode()).find('h4').text()).to.eql('Normalize');
    });

    it('sets the React dependency', function() {
      expect($(listItems[0]).find('h4').text()).to.eql('React');
    });

  });
  
});
