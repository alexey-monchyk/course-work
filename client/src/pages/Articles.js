import React, { Fragment } from 'react';

import ArticlesContainer from '../containers/ArticlesContainer';
import { NavBar } from '../shared';

export default () => (
  <Fragment>
    <NavBar />
    <ArticlesContainer />
  </Fragment>
);
