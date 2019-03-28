export default (values) => {
  let errors = {};
  let hasErrors = false;

  if (!values.firstName || values.firstName.trim() === '') {
    errors.firstName = 'Enter a first name';
    hasErrors = true;
  }
  if (!values.surname || values.firstName.trim() === '') {
    errors.surname = 'Enter surname'
    hasErrors = true;
  }
  if (!values.email || values.email.trim() === '') {
    errors.email = 'Enter email';
    hasErrors = true;
  }
  if (!values.password || values.password.trim() === '') {
    errors.password = 'Enter password';
    hasErrors = true;
  }
  if (!values.confirmedPassword || values.confirmedPassword.trim() === '') {
    errors.confirmedPassword = 'Enter Confirm Password';
    hasErrors = true;
  }
  if (values.confirmedPassword && values.confirmedPassword.trim() !== '' && values.password && values.password.trim() !== '' && values.password !== values.confirmedPassword) {
    errors.password = 'Password And Confirm Password don\'t match';
    hasErrors = true;
  }

  return hasErrors && errors;
}