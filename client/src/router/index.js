import React, { Component } from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';

import ArticlesIndex from '../pages/ArticlesIndex';
import ArticlesNew from '../pages/ArticlesNew';
import ArticlesShow from '../pages/ArticlesShow';
import ArticlesUpdate from '../pages/ArticlesUpdate';
import SignIn from '../pages/SignIn';
import SignUp from '../pages/SignUp';
import Profile from '../pages/Profile';

export default class AppRouter extends Component {
  render() {
    return (
      <BrowserRouter>
        <Switch>
          <Route path='/' component={ArticlesIndex} exact />
          <Route path='/articles/new' component={ArticlesNew} />
          <Route path='/articles/:id' component={ArticlesShow} />
          <Route path='/articles/:id' component={ArticlesUpdate} />
          <Route path='/sign-in' component={SignIn} />
          <Route path='/sign-up' component={SignUp} />
          <Route path='/profile' component={Profile} />
        </Switch>
      </BrowserRouter>
    );
  }
} 