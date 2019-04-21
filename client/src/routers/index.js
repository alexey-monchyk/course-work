import React, { useReducer } from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import { SnackbarProvider } from 'notistack';
import AuthContext from '../contexts/AuthContext';
import authReducer, { authInitialState } from '../reducers/auth';
import PrivateRoute from './PrivateRoute';

import {
  Articles,
  ArticleCreate,
  SignIn,
  SignUp,
  Users,
  NotFound,
} from '../pages';

import { Footer } from '../shared';

export default () => {
  const [authState, dispatch] = useReducer(authReducer, authInitialState);

  return (
    <SnackbarProvider>
      <AuthContext.Provider
        value={{
          ...authState,
          dispatch,
        }}
      >
        <BrowserRouter>
          <>
            <Switch>
              <Route exact path='/' component={Articles} />
              <Route exact path='/sign-in' component={SignIn} />
              <Route exact path='/sign-up' component={SignUp} />
              <PrivateRoute exact path='/users' component={Users} />
              <PrivateRoute exact path='/create' component={ArticleCreate} />
              <Route component={NotFound} />
            </Switch>
            <Footer />
          </>
        </BrowserRouter>
      </AuthContext.Provider>
    </SnackbarProvider>
  )
}