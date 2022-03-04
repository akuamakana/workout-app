import { errorMapper } from '../../utils/errorMapper';
const testError = {
  graphQLErrors: [
    {
      message: 'Argument Validation Error',
      locations: [{ line: 2, column: 3 }],
      path: ['register'],
      extensions: {
        code: 'INTERNAL_SERVER_ERROR',
        exception: {
          validationErrors: [
            { target: { email: '', firstName: '', lastName: '', username: '', password: '' }, value: '', property: 'email', children: [], constraints: { isEmail: 'email must be an email' } },
            {
              target: { email: '', firstName: '', lastName: '', username: '', password: '' },
              value: '',
              property: 'firstName',
              children: [],
              constraints: { isLength: 'firstName must be longer than or equal to 1 characters' },
            },
            {
              target: { email: '', firstName: '', lastName: '', username: '', password: '' },
              value: '',
              property: 'lastName',
              children: [],
              constraints: { isLength: 'lastName must be longer than or equal to 1 characters' },
            },
            {
              target: { email: '', firstName: '', lastName: '', username: '', password: '' },
              value: '',
              property: 'username',
              children: [],
              constraints: { isLength: 'username must be longer than or equal to 4 characters' },
            },
            {
              target: { email: '', firstName: '', lastName: '', username: '', password: '' },
              value: '',
              property: 'password',
              children: [],
              constraints: { isLength: 'password must be longer than or equal to 4 characters' },
            },
          ],
          stacktrace: [
            'Error: Argument Validation Error',
            '    at Object.validateArg (/home/akuamakana/Source/Repos/workout-app/server/node_modules/type-graphql/dist/resolvers/validate-arg.js:29:15)',
            '    at async Promise.all (index 0)',
          ],
        },
      },
    },
  ],
  data: null,
};

describe('errorMapper', () => {
  it('should return errors', () => {
    const errors = errorMapper(testError as any);
    expect(errors).toMatchObject({
      email: 'must be an email',
      firstName: 'must be longer than or equal to 1 characters',
      lastName: 'must be longer than or equal to 1 characters',
      username: 'must be longer than or equal to 4 characters',
      password: 'must be longer than or equal to 4 characters',
    });
  });
});
