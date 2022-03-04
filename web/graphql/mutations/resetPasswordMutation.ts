const resetPasswordMutation = `
mutation ResetPassword($password: PasswordInput!) {
  resetPassword(password: $password)
}
`;

export default resetPasswordMutation;
