import { act, fireEvent, render } from '@testing-library/react';
import { CombinedError } from 'urql';
import { fromValue } from 'wonka';
import whenStable from '__test__/test_utils/whenStable';
import Login from '../../pages/login';
import Wrapper from '../test_utils/Wrapper';

const loggedInClient: any = {
  executeMutation: () =>
    fromValue({
      data: {
        login: {
          id: 1,
          username: 'jest',
          email: 'jest',
        },
      },
    }),
};

const failedClient: any = {
  executeMutation: () =>
    fromValue({
      data: {
        login: null,
      },
    }),
};

const errorClient: any = {
  executeMutation: () =>
    fromValue({
      errors: [],
    }),
};

const unverifiedClient: any = {
  executeMutation: () =>
    fromValue({
      error: new CombinedError({
        networkError: Error('Access denied!'),
      }),
    }),
};

const specialClient: any = {
  executeMutation: () =>
    fromValue({
      error: new CombinedError({
        networkError: Error(':('),
      }),
    }),
};

describe('Login', () => {
  it('should render login page', () => {
    const { getAllByRole } = render(
      <Wrapper>
        <Login />
      </Wrapper>
    );

    const inputs = getAllByRole(/Input/);
    expect(inputs).toHaveLength(2);
  });

  it('should login', async () => {
    const { getAllByRole, getByRole } = render(
      <Wrapper value={loggedInClient}>
        <Login />
      </Wrapper>
    );

    const inputs = getAllByRole(/Input/);
    const submit = getByRole('submit');
    await act(async () => {
      inputs[0].focus();
      fireEvent.change(inputs[0], { target: { value: 'jest' } });
      inputs[1].focus();
      fireEvent.change(inputs[1], { target: { value: 'jest' } });
      fireEvent.click(submit);
    });
  });

  it('should fail to login', async () => {
    const { getByRole, getByText } = render(
      <Wrapper value={failedClient}>
        <Login />
      </Wrapper>
    );

    await act(async () => {
      getByRole('submit').click();
    });
    await whenStable();
    const text = getByText('Username/password combination not found.');
    expect(text).toBeInTheDocument();
  });

  it('should stop invalidated user', async () => {
    const { getByText, getByRole } = render(
      <Wrapper value={unverifiedClient}>
        <Login />
      </Wrapper>
    );

    await act(async () => {
      getByRole('submit').click();
    });
    await whenStable();

    expect(getByText('Account is not confirmed. Check your inbox for a confirmation email.')).toBeInTheDocument();
  });

  it('should receive an error', async () => {
    const { getByRole } = render(
      <Wrapper value={errorClient}>
        <Login />
      </Wrapper>
    );

    await act(async () => {
      getByRole('submit').click();
    });
    await whenStable();
  });

  it('should receive a different error', async () => {
    const { getByRole } = render(
      <Wrapper value={specialClient}>
        <Login />
      </Wrapper>
    );

    await act(async () => {
      getByRole('submit').click();
    });
  });
});
