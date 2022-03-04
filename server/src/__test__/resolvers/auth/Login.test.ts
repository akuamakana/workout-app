import gCall from '../../utils/gCall';

const loginMutation = `
mutation Login($password: String!, $usernameOrEmail: String!) {
  login(password: $password, usernameOrEmail: $usernameOrEmail) {
    username
    email
  }
}
`;

const loginData = {
  password: 'jest',
  usernameOrEmail: 'jest',
};

describe('Login', () => {
  it('logs in a user with username', async () => {
    const data = await gCall({
      source: loginMutation,
      variableValues: loginData,
    });
    expect(data).toMatchObject({
      data: {
        login: {
          username: 'jest',
          email: 'jest@jest.com',
        },
      },
    });
  });

  it('logs in a user with email', async () => {
    const data = await gCall({
      source: loginMutation,
      variableValues: { ...loginData, usernameOrEmail: 'jest@jest.com' },
    });
    expect(data).toMatchObject({
      data: {
        login: {
          username: 'jest',
          email: 'jest@jest.com',
        },
      },
    });
  });

  it('fails with unmatched username/email', async () => {
    const data = await gCall({
      source: loginMutation,
      variableValues: { ...loginData, usernameOrEmail: 'random@random.com' },
    });

    expect(data).toMatchObject({ data: { login: null } });
  });

  it('fails to login with incorrect password', async () => {
    const data = await gCall({
      source: loginMutation,
      variableValues: { ...loginData, password: 'jest@jest.com' },
    });
    expect(data).toMatchObject({
      data: { login: null },
    });
  });
});
