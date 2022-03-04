import { fireEvent, render } from '@testing-library/react';
import { fromValue } from 'wonka';
import logSpy from '__test__/test_utils/logSpy';
import whenStable from '__test__/test_utils/whenStable';
import Wrapper from '__test__/test_utils/Wrapper';
import Index from '../../pages/index';

const loggedInClient: any = {
  executeMutation: () =>
    fromValue({
      data: {
        logout: true,
      },
    }),
  executeQuery: () =>
    fromValue({
      data: {
        me: {
          id: '1',
          username: 'jest',
          email: 'jest@gmail.com',
          firstName: 'jest',
          lastName: 'jest',
        },
      },
    }),
};

const errorClient: any = {
  ...loggedInClient,
  executeMutation: () => new Error(),
};

describe('Index', () => {
  it('should render index page', () => {
    const { getByText } = render(
      <Wrapper>
        <Index />
      </Wrapper>
    );

    const welcome = getByText('Welcome, user');
    expect(welcome).toBeInTheDocument();
  });

  it('should render logged in username', () => {
    const { getByText } = render(
      <Wrapper value={loggedInClient}>
        <Index />
      </Wrapper>
    );

    const welcome = getByText('Welcome, jest');
    expect(welcome).toBeInTheDocument();
  });

  it('should send to login page after logout', async () => {
    const { getByText } = render(
      <Wrapper value={loggedInClient}>
        <Index />
      </Wrapper>
    );

    const logoutButton = getByText('Logout');
    expect(logoutButton).toBeInTheDocument();
    fireEvent.click(logoutButton);
  });

  it('should error', async () => {
    const spy = logSpy();
    const { getByText } = render(
      <Wrapper value={errorClient}>
        <Index />
      </Wrapper>
    );
    const logoutButton = getByText('Logout');
    fireEvent.click(logoutButton);
    await whenStable();
    expect(spy).toHaveBeenCalled();
  });
});
