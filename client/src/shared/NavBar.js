import React, { useContext } from 'react';
import AuthContext from '../contexts/AuthContext';
import Cookies from 'js-cookie';
import styled from 'styled-components';
import { CLEAR_AUTH } from '../reducers/auth';
import { Link, withRouter } from 'react-router-dom';
import { AppBar, Toolbar, Typography, Button } from '@material-ui/core';

const CustomAppBar = styled(AppBar)`
  background-color: #263238 !important;
  position: fixed !important;
`;

const CustomToolbar = styled(Toolbar)`
  justify-content: space-between;
`;

const CustomButton = styled(Button)`
  color: #fff !important;
  font-weight: 400 !important;
  letter-spacing: 1px;
  background: linear-gradient(45deg, #FE6B8B 30%, #FF8E53 90%);
  box-shadow: 0 3px 5px 2px rgba(255, 105, 135, .3);
  border-radius: 3;
  height: 38px;
  padding: 0 30px !important;
`;

const NavBar = (props) => {
  const auth = useContext(AuthContext);
  const isAuthorized = !!(auth.refreshToken && auth.token);

  const handleLogoutClick = () => {
    Cookies.remove('access_token');
    Cookies.remove('refresh_token');
    localStorage.removeItem('user');

    if (auth.dispatch) {
      auth.dispatch({ type: CLEAR_AUTH });
    }

    props.history.push('/sign-in');
  }

  return (
    <CustomAppBar position='static'>
      <CustomToolbar>
        <Typography variant='headline' color='inherit'>
          Articles Storage
        </Typography>
        {
          isAuthorized ?
            <CustomButton onClick={handleLogoutClick}>Logout</CustomButton> :
            <CustomButton component={Link} to='/sign-in'>Login</CustomButton>
        }
      </CustomToolbar>
    </CustomAppBar>
  )
}

export default withRouter(NavBar);