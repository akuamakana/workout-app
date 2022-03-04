import gCall from '../../utils/gCall';

const confirmEmailMutation = `
mutation Mutation {
  confirmEmail
}
`;

describe('ConfirmEmail', () => {
  it('should return true if account is not verified', async () => {
    const data = await gCall({
      source: confirmEmailMutation,
    });
    console.log(data)
  });

  it('should return false if token does not exist')
});
