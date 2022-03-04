import whenStable from '__test__/test_utils/whenStable';
import { ChakraProvider } from '@chakra-ui/react';
import theme from '../../styles/theme';
import Register from '../../pages/register';
import { fireEvent, render, act } from '@testing-library/react';
import { Provider } from 'urql';
import { fromValue } from 'wonka';
import errorClient from '../test_utils/errorClient';

const loggedInClient: any = {
  executeMutation: () =>
    fromValue({
      data: {
        register: {
          id: 1,
          username: 'jest',
          password: 'jest',
        },
      },
    }),
};

describe('Register', () => {
  it('should render Register page', () => {
    const { getAllByRole } = render(
      <ChakraProvider theme={theme}>
        <Provider value={loggedInClient}>
          <Register />
        </Provider>
      </ChakraProvider>
    );

    const inputs = getAllByRole(/Input/);
    expect(inputs).toHaveLength(6);
  });

  it('should register user', async () => {
    const { getByRole } = render(
      <ChakraProvider theme={theme}>
        <Provider value={loggedInClient}>
          <Register />
        </Provider>
      </ChakraProvider>
    );

    const register = getByRole('submit');

    await act(async () => {
      fireEvent.click(register);
    });
  });

  it('should render field errors', async () => {
    const { getByRole, getByText } = render(
      <ChakraProvider theme={theme}>
        <Provider value={errorClient}>
          <Register />
        </Provider>
      </ChakraProvider>
    );

    const register = getByRole('submit');
    const password = getByRole('passwordInput');
    const confirmPassword = getByRole('confirmPasswordInput');

    await act(async () => {
      fireEvent.change(password, { target: { value: '1234' } });
      fireEvent.change(confirmPassword, { target: { value: '123' } });
      fireEvent.click(register);
    });
    await whenStable();
    expect(getByText('Passwords do not match')).toBeInTheDocument();
    await act(async () => {
      fireEvent.change(password, { target: { value: '1234' } });
      fireEvent.change(confirmPassword, { target: { value: '1234' } });
      fireEvent.click(register);
    });
    await whenStable();
  });
});
