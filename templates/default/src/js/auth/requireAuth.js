// requireAuth.js

import auth from '../auth/auth';
import login from '../views/login';
import appConfig from '../appConfig';

export default (component) => {
  return () => {
    if (appConfig.requireAuthentication && !auth.loggedIn()) {
      login(component);
    } else {
      component();
    }
  };
};
