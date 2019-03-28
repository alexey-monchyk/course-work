import { combineReducers } from 'redux';
import { reducer as formReducer } from 'redux-form';

import userReducer from './reducer_user';
import articleReducer from './reducer_article';
import validateUserFieldsReducer from './reducer_validateUserFields';

const rootReducer = combineReducers({
  user: userReducer,
  validateFields: validateUserFieldsReducer,
  articles: articleReducer,
  form: formReducer
});

export default rootReducer;