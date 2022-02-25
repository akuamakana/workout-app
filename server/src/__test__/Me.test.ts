import gCall from './utils/gCall';

describe('Me', () => {
  const loginMutation = `
  mutation Login($password: String!, $usernameOrEmail: String!) {
    login(password: $password, usernameOrEmail: $usernameOrEmail) {
      id
    }
  }
  `;

  const meQuery = `
  query Me {
    me {
      id
      username
      email
    }
  }
  `;

  it('gets logged in user', async () => {
    await gCall({
      source: loginMutation,
      variableValues: {
        usernameOrEmail: 'jest',
        password: 'jest',
      },
    });
    const data = await gCall({
      source: meQuery,
      userId: 1,
    });
    expect(data).toMatchObject({
      data: {
        me: {
          username: 'jest',
          email: 'jest@jest.com',
        },
      },
    });
  });

  it('gets null', async () => {
    const data = await gCall({
      source: meQuery,
    });
    expect(data).toMatchObject({ data: { me: null } });
  });
});
