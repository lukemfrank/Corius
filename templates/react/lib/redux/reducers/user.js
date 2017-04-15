// user.js

import { getUser } from '../api/api';
import { Map } from 'immutable';

export const REQUEST_USER = 'REQUEST_USER';
function requestUser() {
  return { type: REQUEST_USER };
}

export const RECEIVE_USER = 'RECEIVE_USER';
function receiveUser(json) {
  return {
    type: RECEIVE_USER,
    user: json['user'] ? json.user : {}
  };
}

export const RECEIVE_USER_FAILURE  = 'RECEIVE_USER_FAILURE';
function receiveUserFailure(errors) {
  return {
    type: RECEIVE_USER_FAILURE,
    user: {
      errors: errors['json'] ? errors.json.errors : {
        error: {
          message: 'Error retrieving user credentials.'
        }
      }
    }
  };
}

function fetchUser() {
  return dispatch => {
    dispatch(requestUser());
    return getUser()
      .then(json => dispatch(receiveUser(json)))
      .catch(errors => dispatch(receiveUserFailure(errors)));
  };
}

function fetchSessionStoredUser() {
  return dispatch => {
    dispatch(requestUser());
    // attempting to reach out to sessionStorage to fetch for already authenticated user.
    let storedUser = JSON.parse(sessionStorage.getItem('currentUser'));
    let storedUserNotifications = JSON.parse(sessionStorage.getItem('currentUserNotifications'));
    let currentUser = {
      user: {
        userData: storedUser,
        messages: storedUserNotifications
      }
    };
    return dispatch(receiveUser(currentUser));
  };
}

function shouldFetchUser(state) {
  if (!state.user.get('user')) {
    return true;
  }
  if (state.user.get('isFetchingUser')) {
    return false;
  }
  return false;
}

export function fetchUserIfNeeded(dispatch, getState) {
  if(sessionStorage.getItem('currentUser')) {
    dispatch(fetchSessionStoredUser());
  } else if (shouldFetchUser(getState())) {
    dispatch(fetchUser());
  }
}

export default function reducer(state = Map({}), action) {
  switch (action.type) {
    case REQUEST_USER:
      return state.merge({
        isFetchingUser: true
      });
    case RECEIVE_USER:
      return state.merge({
        isFetchingUser: false,
        user: action.user
      });
    case RECEIVE_USER_FAILURE:
      return state.merge({
        isFetchingUser: false,
        user: action.user
      });
    default:
      return state;
  }
}
