import Cookies from 'js-cookie';

export const SAVE_TOKENS = 'SAVE_TOKENS';
export const SAVE_USER = 'SAVE_USER';
export const CLEAR_AUTH = 'CLEAR_AUTH';

const token = Cookies.get('access_token') || null;
const refreshToken = Cookies.get('refresh_token') || null;
const user = token && refreshToken ? localStorage.getItem('user') || null : null;

export const authInitialState = {
  user: user ? JSON.parse(user) : null,
  token,
  refreshToken
}

export default (state = authInitialState, action) => {
  switch(action.type) {
    case SAVE_TOKENS:
      return { ...state, ...action.payload.tokens };

    case SAVE_USER:
      return { ...state, user: action.payload.user };
      
    case CLEAR_AUTH:
      return authInitialState;

    default:
      return state;
  }
}
