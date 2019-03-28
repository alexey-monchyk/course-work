import {
  SIGNUP_USER,
  SIGNUP_USER_SUCCESS,
  SIGNUP_USER_FAILURE,
  SIGNIN_USER,
  SIGNIN_USER_SUCCESS,
  SIGNIN_USER_FAILURE,
  LOGOUT_USER,
  RESET_USER,
} from '../constants/users';

const INITIAL_STATE = { user: null, status: null, error: null, loading: false };

export default function (state = INITIAL_STATE, action) {
  let error;
  switch (action.type) {
    case SIGNUP_USER:
      return { ...state, user: null, status: 'signup', error: null, loading: true };

    case SIGNUP_USER_SUCCESS:
      return { ...state, user: action.payload.user, status: 'authenticated', error: null, loading: false };

    case SIGNUP_USER_FAILURE:
      error = action.payload.data || { message: action.payload.message };
      return { ...state, user: null, status: 'signup', error: error, loading: false };




    case SIGNIN_USER:
      return { ...state, user: null, status: 'signin', error: null, loading: true };

    case SIGNIN_USER_SUCCESS:
      return { ...state, user: action.payload.user, status: 'authenticated', error: null, loading: false };

    case SIGNIN_USER_FAILURE:
      error = action.payload.data || { message: action.payload.message };
      return { ...state, user: null, status: 'signin', error, loading: false };



    case LOGOUT_USER:
      return { ...state, user: null, status: 'logout', error: null, loading: false };



    case RESET_USER:
      return { ...state, user: null, status: null, error: null, loading: false };



    default:
      return state;
  }
}