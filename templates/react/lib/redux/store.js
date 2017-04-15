// configureStore.js

import { createStore, applyMiddleware } from 'redux';
import { syncHistory } from 'react-router-redux';
import { useRouterHistory } from 'react-router';
import { createHistory, createHashHistory  } from 'history';
import { supportsHistory  } from 'history/lib/DOMUtils';
import createLogger from 'redux-logger';
import thunk from 'redux-thunk';

import rootReducer from './reducers/rootReducer';

// global variable arriving from index.html
const base = document.getElementsByTagName('base')[0];
const BASE_URL = base.attributes[0].value;

/**
 * Manually create history using a custom basename configuration, this will ensure
 * that all routes will be run relative to the value of BASE_URL.
 *
 * We're testing for history support and falling back to hash history for older browsers.
 */
const history = useRouterHistory(
  supportsHistory() ? createHistory : createHashHistory
)({
  basename: BASE_URL
});

/**
* History middleware allows action creators to call history methods.
* The middleware will look for route actions created by push, replace, etc.
* and apply them to the history.
*/
const reduxRouterMiddleware = syncHistory(history);
const createStoreWithMiddleware = applyMiddleware(
  thunk,
  reduxRouterMiddleware,
  createLogger()
)(createStore);
const store = createStoreWithMiddleware(rootReducer);

export { store, history };
