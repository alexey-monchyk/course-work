import React, { Fragment } from 'react';

import ArticleCreate from '../containers/ArticleCreateContainer';
import { NavBar } from '../shared';

export default () => (
  <Fragment>
    <NavBar />
    <ArticleCreate />
  </Fragment>
);
