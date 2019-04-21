import React, { useContext } from 'react';
import { Redirect, Route } from 'react-router-dom';
import AuthContext from '../contexts/AuthContext';

const PrivateRoute = ({ component: Component, ...rest }) => {
  const auth = useContext(AuthContext);
  const isAuthorized = !!(auth.token && auth.refreshToken);

  return <Route {...rest} render={(props) => (
    isAuthorized === true
      ? <Component {...props} />
      : <Redirect to='/sign-in' />
  )} />
};

export default PrivateRoute;