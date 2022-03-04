import gCall from '../../utils/gCall';

describe('Register', () => {
  const registerMutation = `
  mutation Register($input: RegisterInput!) {
    register(input: $input) {
      id
      username
      email
    }
  }
  `;

  const userData = {
    input: {
      email: 'jest@jest.com',
      username: 'jest',
      password: 'jest',
    },
  };

  it('creates a user', async () => {
    const data = await gCall({
      source: registerMutation,
      variableValues: userData,
    });
    expect(data).toMatchObject({
      data: {
        register: {
          email: 'jest@jest.com',
          id: '1',
          username: 'jest',
        },
      },
    });
  });

  it('fails to create with duplicate email', async () => {
    const { errors } = await gCall({
      source: registerMutation,
      variableValues: {
        input: {
          email: 'jest@jest.com',
          username: 'jest2',
          password: 'jest',
        },
      },
    });
    expect(errors).toMatchSnapshot();
  });
});
