import { render } from '@testing-library/react';
import { fromValue } from 'wonka';
import whenStable from '__test__/test_utils/whenStable';
import ForgotPassword from '../../pages/forgot-password';
import Wrapper from '../test_utils/Wrapper';

const forgotPasswordResponse = 'An email has been sent to the requested email with a reset password link. This link will expire in 24 hours.';

const mockClient: any = {
  executeMutation: () =>
    fromValue({
      data: {
        forgotPassword: forgotPasswordResponse,
      },
    }),
};

describe('ForgotPassword', () => {
  it('should render', () => {
    const { getByRole } = render(
      <Wrapper>
        <ForgotPassword />
      </Wrapper>
    );

    expect(getByRole('emailInput')).toBeInTheDocument();
  });

  it('should send email', async () => {
    const { getByRole, getByText } = render(
      <Wrapper value={mockClient}>
        <ForgotPassword />
      </Wrapper>
    );

    getByRole('emailInput').focus();
    getByRole('submit').click();
    await whenStable();

    expect(getByText(forgotPasswordResponse)).toBeInTheDocument();
  });
});
