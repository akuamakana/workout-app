import theme from '../../styles/theme';
import { Client, Provider } from 'urql';
import { ChakraProvider } from '@chakra-ui/react';

const mockClient = {
  executeQuery: jest.fn(() => {}),
  executeMutation: jest.fn(() => {}),
  executeSubscription: jest.fn(() => {}),
} as any;

const Wrapper: React.FC<{ value?: Client }> = ({ value, children }) => {
  const client = value || mockClient;
  return (
    <Provider value={client}>
      <ChakraProvider theme={theme}>{children}</ChakraProvider>
    </Provider>
  );
};

export default Wrapper;
