const loginMutation = `
mutation Login($password: String!, $usernameOrEmail: String!) {
  login(password: $password, usernameOrEmail: $usernameOrEmail) {
    username
    email
    id
  }
}
`;
export default loginMutation;
