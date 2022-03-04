const forgotPasswordMutation = `
mutation ForgotPassword($email: String!) {
  forgotPassword(email: $email)
}
`;

export default forgotPasswordMutation;
