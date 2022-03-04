const sendVerificationMutation = `
mutation SendVerification($email: String!) {
  sendVerification(email: $email)
}
`;

export default sendVerificationMutation;
