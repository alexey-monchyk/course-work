import React from 'react';
import { withRouter, NavLink } from 'react-router-dom';
import { Paper, Tabs, Tab } from '@material-ui/core';
import styled from 'styled-components';

const FooterPaper = styled(Paper)`
  z-index: 1000;
  position: fixed;
  width: 100%;
  bottom: 0;
`;

const Footer = (props) => {
  const checkPathnameValue = (e, value) => {
    const { pathname } = props.history.location;
    switch(pathname) {
      case '/': return '/'
      case '/create': return '/create'
      case '/users': return '/users'
      case '/self/articles': return '/self/articles'
      default: return false;
    }
  };

  return (
    <FooterPaper>
      <Tabs
        value={checkPathnameValue()}
        indicatorColor='secondary'
        textColor='secondary'
        centered
      >
        <Tab component={NavLink} to='/' value='/' label='All' />
        <Tab component={NavLink} to='/create' value='/create' label='Create' />
        <Tab component={NavLink} to='/users' value='/users' label='Users' />
        <Tab component={NavLink} to='/self/articles' value='/self/articles' label='My Articles' />
      </Tabs>
    </FooterPaper>
  );
}

export default withRouter(Footer)