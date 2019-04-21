import React from 'react';
import styled from 'styled-components';
import UsersListItem from './UsersListItem'
import { List, Grid } from '@material-ui/core';
import Articles from './Articles';

const CustomList = styled(List)`
  background-color: #fff;
`;

export default (props) => {
  const renderUsers = () => {
    if (props.users) {
      return props.users.map(user => <UsersListItem getArticlesByUser={props.getArticlesByUser} key={user.id} user={user} />);
    }
  }

  return (
    <>
      <Grid container>
        <Grid item md={3} xs={12}>
          <CustomList>
            {renderUsers()}
          </CustomList>
        </Grid>
        <Grid item md={9} xs={12}>
          {
            props.articles.length === 0 ?
              <div>That user doesn't have any articles.</div> :
              <Articles articles={props.articles} />
          }
        </Grid>
      </Grid>
    </>
  )
}