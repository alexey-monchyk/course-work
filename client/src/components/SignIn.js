import React, { useState, useContext } from 'react';
import { Link, withRouter, Redirect } from 'react-router-dom';
import styled from 'styled-components';
import axios from 'axios';
import Cookies from 'js-cookie';
import { withSnackbar, useSnackbar } from 'notistack';
import { Paper, Typography, Input, InputAdornment, Button } from '@material-ui/core';
import { AccountCircleRounded, EmailRounded, Fingerprint } from '@material-ui/icons';
import AuthContext from '../contexts/AuthContext';
import { SAVE_TOKENS, SAVE_USER } from '../reducers/auth';

const LoginButton = styled(Button)`
  color: #fff !important;
  font-weight: 400 !important;
  letter-spacing: 1px;
  background: linear-gradient(45deg, #FE6B8B 30%, #FF8E53 90%);
  box-shadow: 0 3px 5px 2px rgba(255, 105, 135, .3);
  border-radius: 3;
  height: 38px;
  padding: 0 30px !important;
`;

const Container = styled.div`
  height: calc(100vh - 50px);
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const CustomLink = styled(Button)`
  margin: 10px 0 20px 0 !important;
`;

const CustomPaper = styled(Paper)`
  max-width: 500px;
  display: flex;
  align-items: center;
  flex-direction: column;
  padding: 50px;
`;

const CustomForm = styled.form`
  display: flex;
  align-items: center;
  flex-direction: column;
`;

const CustomInput = styled(Input)`
  width: 300px !important;
  margin: 15px 0;
`;

const CustomTypography = styled(Typography)`
  margin-top: 10px !important;
  margin-bottom: 30px !important;
`;

const CustomAccountCircleRounded = styled(AccountCircleRounded)`
  font-size: 70px !important;
`;

const SignIn = (props) => {
  const auth = useContext(AuthContext);
  const isAuthorized = !!(auth.token && auth.refreshToken);
  const { dispatch } = useContext(AuthContext);
  const { enqueueSnackbar } = useSnackbar();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const changeEmail = (e) => setEmail(e.target.value);
  const changePassword = (e) => setPassword(e.target.value);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post('/users/login', { email, password });

      if (!res.data) console.log('Something wrong.');

      Cookies.set('access_token', res.data.tokens.accessToken, {
        expires: res.data.tokens.expiredAt,
      });
      Cookies.set('refresh_token', res.data.tokens.refreshToken);
      localStorage.setItem('user', JSON.stringify(res.data.user));

      if (dispatch) {
        dispatch({ type: SAVE_TOKENS, payload: { tokens: res.data.tokens } });
        dispatch({ type: SAVE_USER, payload: { user: res.data.user } });
      }

      props.history.push('/');
    } catch (e) {
      e.response && enqueueSnackbar(e.response.data.error, { variant: 'error' });
    }
  }

  if (isAuthorized) return <Redirect to='/' />

  return (
    <Container>
      <CustomPaper>
        <CustomForm onSubmit={handleSubmit}>
          <CustomAccountCircleRounded color='secondary' />
          <CustomTypography variant='h4'>Sign In</CustomTypography>
          <CustomInput
            placeholder='Email'
            type='email'
            value={email}
            onChange={changeEmail}
            startAdornment={
              <InputAdornment position="start">
                <EmailRounded />
              </InputAdornment>
            }
          />
          <CustomInput
            placeholder='Password'
            type='password'
            value={password}
            onChange={changePassword}
            startAdornment={
              <InputAdornment position="start">
                <Fingerprint />
              </InputAdornment>
            }
          />
          <CustomLink to='/sign-up' component={Link}>Don't have an account?</CustomLink>
          <LoginButton type='submit'>Sign In</LoginButton>
        </CustomForm>
      </CustomPaper>
    </Container>
  )
}

export default withRouter(withSnackbar(SignIn));