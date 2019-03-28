import { 
  VALIDATE_USER_FIELDS, 
  VALIDATE_USER_FIELDS_SUCCESS, 
  VALIDATE_USER_FIELDS_FAILURE, 
  RESET_VALIDATE_USER_FIELDS
} from '../constants/validateUserFields';

const INITIAL_STATE = { error: null, loading: false };

export default function (state = INITIAL_STATE, action) {
  let error;
  switch (action.type) {
    case VALIDATE_USER_FIELDS:
      
      return { ...state, error: null, loading: true };

    case VALIDATE_USER_FIELDS_SUCCESS:
      return { ...state, error: null, loading: false };

    case VALIDATE_USER_FIELDS_FAILURE:
      error = action.payload.response ? { message: action.payload.response.data.error } : { message: action.payload.message }
      return { ...state, error, loading: false };

    case RESET_VALIDATE_USER_FIELDS:
      return { ...state, error: null, loading: false };
      
    default:
      return state;
  }
}