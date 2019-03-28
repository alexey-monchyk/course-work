import SignUpForm from '../components/SignUpForm';
import { resetValidateUserFields } from '../actions/validateUserFields';
import { connect } from 'react-redux';

const mapDispatchToProps = (dispatch) => ({
  resetMe: () => {
    dispatch(resetValidateUserFields());
  }
});

const mapStateToProps = (state, ownProps) => ({
  user: state.user,
  validateFields: state.validateFields,
});

export default connect(mapStateToProps, mapDispatchToProps)(SignUpForm);