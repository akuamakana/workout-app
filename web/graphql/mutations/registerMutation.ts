const registerMutation = `
  mutation Register($input: RegisterInput!) {
    register(input: $input) {
      id
      username
      email
    }
  }
`;

export default registerMutation;
