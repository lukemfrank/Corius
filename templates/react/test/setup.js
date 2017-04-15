// setup.js

(function() {
  // insert base element with baseUrl into the DOM
  let base = document.createElement('base');
  base.href = '/';
  document.body.appendChild(base);

  // insert the root app div into the DOM
  let rootEl = document.createElement('div');
  rootEl.id = 'app';
  document.body.appendChild(rootEl);
})();