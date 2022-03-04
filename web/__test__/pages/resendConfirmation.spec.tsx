import Wrapper from '../test_utils/Wrapper';
import ResendConfirmation from '../../pages/resend-confirmation';
import { render, fireEvent, act } from '@testing-library/react';
import whenStable from '__test__/test_utils/whenStable';
import { fromValue } from 'wonka';

const mockClient: any = {
  executeMutation: () =>
    fromValue({
      data: {
        sendVerification: true,
      },
    }),
};

describe('ResendConfirmation', () => {
  it('should render', async () => {
    const { getByRole, getByText } = render(
      <Wrapper value={mockClient}>
        <ResendConfirmation />
      </Wrapper>
    );

    const input = getByRole('emailInput');

    expect(getByText('Resend Confirmation Email')).toBeInTheDocument();
    expect(input).toBeInTheDocument();
    await act(async () => {
      fireEvent.change(input, { target: { value: 'test@gmail.com' } });
      fireEvent.click(getByRole('submit'));
    });
    await whenStable();
    expect(getByText('Email has been sent to the requested email address.')).toBeInTheDocument();
  });
});
