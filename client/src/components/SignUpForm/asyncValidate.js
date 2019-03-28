/* eslint-disable no-throw-literal */
import {
  validateUserFields,
  validateUserFieldsSuccess,
  validateUserFieldsFailure
} from '../../actions/validateUserFields';

export default (values, dispatch) => {
  return dispatch(validateUserFields(values))
    .then((result) => {
      if (!result.payload.response) {
        return;
      }

      dispatch(validateUserFieldsSuccess());
    })
    .catch((e) => {
      dispatch(validateUserFieldsFailure(e));
      if (e.response.data) {
        throw { email: e.response.data.error };
      }
    });
};