import React from 'react';
import styled from 'styled-components';
import { Grid } from '@material-ui/core';
import ArticleItem from './ArticleItem';

const CustomGrid = styled(Grid)`
  padding-top: 60px;
`

const Articles = (props) =>
  <CustomGrid container>
    {props.articles.map(article => <ArticleItem key={article.id} article={article} />)}
  </CustomGrid>

export default Articles;