// rootReducer.js

import { combineReducers } from 'redux';
import { routeReducer } from 'react-router-redux';

import user from './user';

const rootReducer = combineReducers({
  user,
  routing: routeReducer
});

export default rootReducer;
