import React from 'react';
import styled from 'styled-components';
import { ListItem, ListItemText, ListItemAvatar, Avatar, Divider } from '@material-ui/core';
import CircularProgress from '@material-ui/core/CircularProgress';

const CustomAvatar = styled(Avatar)`
  background-color: #f44336 !important;
`;

export default (props) => {
  if (!props.user) {
    return <CircularProgress color="secondary" />
  }

  const onHandleClick = () => {
    props.getArticlesByUser(props.user.id);
  }

  return <>
    <Divider variant="inset" component="li" />
    <ListItem onClick={onHandleClick} button alignItems="flex-start">
      <ListItemAvatar>
        <CustomAvatar aria-label="Recipe" >
          {props.user.firstName[0]}
        </CustomAvatar>
      </ListItemAvatar>
      <ListItemText
        primary={`${props.user.firstName} ${props.user.surname}`}
        secondary={`${props.user.age} years`} />
    </ListItem>
  </>
}