import React from 'react';

const userInitialContext = {
  refreshToken: null,
  token: null,
  user: null,
  dispatch: null,
}

const AuthContext = React.createContext(userInitialContext);

export default AuthContext;