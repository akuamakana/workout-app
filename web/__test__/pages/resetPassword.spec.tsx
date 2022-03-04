import Wrapper from '../test_utils/Wrapper';
import ResetPassword from '../../pages/reset-password';
import { act, fireEvent, render } from '@testing-library/react';
import whenStable from '__test__/test_utils/whenStable';
import errorClient from '__test__/test_utils/errorClient';
import { fromValue } from 'wonka';

const useRouter = jest.spyOn(require('next/router'), 'useRouter');

const resetClient: any = {
  executeMutation: () =>
    fromValue({
      data: {
        resetPassword: true,
      },
    }),
};

const brokenClient: any = {
  executeMutation: () =>
    fromValue({
      data: {
        resetPassword: false,
      },
    }),
};

describe('ResendConfirmation', () => {
  beforeEach(() => {
    useRouter.mockImplementationOnce(() => ({
      query: {
        token: '123',
        email: '123@gmail.com',
      },
    }));
  });

  it('should render', () => {
    const { getAllByRole, getByText } = render(
      <Wrapper>
        <ResetPassword />
      </Wrapper>
    );

    expect(getByText('Reset Password')).toBeInTheDocument();
    expect(getAllByRole(/Input/)).toHaveLength(2);
  });

  it('should reset password', async () => {
    const { getByRole, getByText } = render(
      <Wrapper value={errorClient}>
        <ResetPassword />
      </Wrapper>
    );

    const password = getByRole('passwordInput');
    const confirmPassword = getByRole('confirmPasswordInput');
    const submit = getByRole('submit');
    await act(async () => {
      password.focus();
      fireEvent.change(password, { target: { value: 'test' } });
      confirmPassword.focus();
      fireEvent.change(confirmPassword, { target: { value: 'test1' } });
      submit.click();
    });
    await whenStable();
    expect(getByText('Passwords do not match')).toBeInTheDocument();

    await act(async () => {
      password.focus();
      fireEvent.change(password, { target: { value: 'test' } });
      confirmPassword.focus();
      fireEvent.change(confirmPassword, { target: { value: 'test' } });
      submit.click();
    });
    await whenStable();
  });

  it('should reset password', async () => {
    const { getByRole, getByText } = render(
      <Wrapper value={resetClient}>
        <ResetPassword />
      </Wrapper>
    );

    const password = getByRole('passwordInput');
    const confirmPassword = getByRole('confirmPasswordInput');
    const submit = getByRole('submit');
    await act(async () => {
      password.focus();
      fireEvent.change(password, { target: { value: 'test' } });
      confirmPassword.focus();
      fireEvent.change(confirmPassword, { target: { value: 'test' } });
      submit.click();
    });

    await whenStable();
    expect(getByText('Password has been changed successfully')).toBeInTheDocument();
  });

  it('should render error message', async () => {
    const { getByRole, getByText } = render(
      <Wrapper value={brokenClient}>
        <ResetPassword />
      </Wrapper>
    );

    const password = getByRole('passwordInput');
    const confirmPassword = getByRole('confirmPasswordInput');
    const submit = getByRole('submit');
    await act(async () => {
      password.focus();
      fireEvent.change(password, { target: { value: 'test' } });
      confirmPassword.focus();
      fireEvent.change(confirmPassword, { target: { value: 'test' } });
      submit.click();
    });

    await whenStable();
    expect(getByText('Something went wrong')).toBeInTheDocument();
  });
});
