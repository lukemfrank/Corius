// app.spec.js

import ReactDOM from 'react-dom';

describe('app', function() {

  let spy = sinon.spy(ReactDOM, 'render');

  afterEach(function() {
    spy.restore();
  });

  require('src/js/app');

  it('renders', function() {
    expect(spy).to.have.been.called;
  });

});
