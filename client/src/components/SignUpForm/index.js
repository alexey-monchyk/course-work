import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { reduxForm, Field, SubmissionError } from 'redux-form';
import cookies from 'js-cookie';

import renderField from '../renderField';
import {
  signUpUser,
  signUpUserSuccess,
  signUpUserFailure
} from '../../actions/users';
import validate from './validate';
import asyncValidate from './asyncValidate';

const validateAndSignUpUser = (values, dispatch) => {
  return dispatch(signUpUser(values))
    .then((result) => {
      if (result.payload.response && result.payload.response.status !== 200) {
        dispatch(signUpUserFailure(result.payload.response.data));
        throw new SubmissionError(result.payload.response.data);
      }

      cookies.set('Authorization', result.payload.data.accessToken);
      cookies.set('Refresh', result.payload.data.refreshToken);
      dispatch(signUpUserSuccess(result.payload.data));
    });
};

class SignUpForm extends Component {
  componentWillMount() {
    this.props.resetMe();
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.user.status === 'authenticated'
      && !nextProps.user.error) {
      this.context.router.push('/');
    }
  }

  render() {
    const { handleSubmit, submitting } = this.props;
    return (
      <div className='container'>
        <form onSubmit={handleSubmit(validateAndSignUpUser)}>
          <Field
            name="firstName"
            type="text"
            component={renderField}
            label="First name*" />
          <Field
            name="surname"
            type="text"
            component={renderField}
            label="Surname*" />
          <Field
            name="email"
            type="email"
            component={renderField}
            label="Email*" />
          <Field
            name="password"
            type="password"
            component={renderField}
            label="Password*" />
          <Field
            name="confirmedPassword"
            type="password"
            component={renderField}
            label="Confirm Password*" />
          <Field
            name="age"
            type="number"
            component={renderField}
            label="Age*" />
          <div>
            <button
              type="submit"
              className="btn btn-primary"
              disabled={submitting}>
              Submit
            </button>
            <Link
              to="/"
              className="btn btn-error"> 
              Cancel
            </Link>
          </div>
        </form>
      </div>
    )
  }
}

export default reduxForm({
  form: 'SignUpForm',
  validate,
  asyncValidate,
  asyncBlurFields: ['email'],
})(SignUpForm);
