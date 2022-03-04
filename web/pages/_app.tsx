import '../styles/globals.css';
import type { AppProps } from 'next/app';
import { ChakraProvider } from '@chakra-ui/react';
import theme from '../styles/theme';
import { ColorModeScript } from '@chakra-ui/react';
import { createClient, Provider, defaultExchanges } from 'urql';

const client = createClient({
  url: process.env.API_URL as string,
  fetchOptions: {
    credentials: 'include',
  },
  exchanges: defaultExchanges,
  requestPolicy: 'cache-and-network',
});

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <Provider value={client}>
      <ChakraProvider theme={theme}>
        <ColorModeScript initialColorMode={theme.config.initialColorMode} />
        <Component {...pageProps} />
      </ChakraProvider>
    </Provider>
  );
}

export default MyApp;
