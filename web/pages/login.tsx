import { Box, Button, Center, Flex, Link as CLink, Alert, AlertDescription, AlertIcon, VStack, Heading, Text } from '@chakra-ui/react';
import InputField from '@components/InputField';
import loginMutation from '@graphql/mutations/loginMutation';
import { Form, Formik } from 'formik';
import type { NextPage } from 'next';
import Head from 'next/head';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useState } from 'react';
import IUser from 'types/IUser';
import { useMutation } from 'urql';

interface LoginInputs {
  usernameOrEmail: string;
  password: string;
}

interface LoginResponse {
  login?: IUser | null;
}

const Login: NextPage = () => {
  const [loginResult, executeLoginMutation] = useMutation<LoginResponse>(loginMutation);
  const [badCombo, setBadCombo] = useState(false);
  const router = useRouter();

  const handleOnSubmit = async (values: LoginInputs) => {
    const { usernameOrEmail, password } = values;
    const { data } = await executeLoginMutation({
      usernameOrEmail,
      password,
    });

    if (data?.login) {
      return router.push('/');
    } else {
      return setBadCombo(true);
    }
  };

  return (
    <>
      <Head>
        <title>Login</title>
        <meta name="description" content="Login to Workout Buddy" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Center>
        <Box boxShadow="lg" p="6" w="xl">
          <Formik initialValues={{ usernameOrEmail: '', password: '' }} onSubmit={handleOnSubmit}>
            {() => (
              <Form>
                <VStack spacing={6} alignItems="stretch">
                  <Heading>Login</Heading>
                  {loginResult.error && (
                    <Alert status="warning">
                      <AlertIcon />
                      <AlertDescription>
                        {loginResult.error.message.includes('Access denied!') ? (
                          <>
                            <Text>Account is not confirmed. Check your inbox for a confirmation email.</Text>
                            <Link href="/resend-confirmation" passHref={true}>
                              <CLink textDecoration="underline" role="register-redirect">
                                Resend confirmation email?
                              </CLink>
                            </Link>
                          </>
                        ) : (
                          loginResult.error.message
                        )}
                      </AlertDescription>
                    </Alert>
                  )}
                  {badCombo && !loginResult.error && (
                    <Alert status="error">
                      <AlertIcon />
                      <AlertDescription>Username/password combination not found.</AlertDescription>
                    </Alert>
                  )}
                  <InputField onFocus={() => setBadCombo(false)} role="usernameOrEmail" name="usernameOrEmail" label="Username" placeholder="Username" data-testid="form-input" />
                  <InputField onFocus={() => setBadCombo(false)} role="password" name="password" label="Password" placeholder="Password" type="password" data-testid="form-input" />
                  <Flex w="100%" justifyContent="space-between" alignItems="center">
                    <Link href="/forgot-password" passHref={true}>
                      <CLink textDecoration="underline" role="forgot-password-redirect">
                        Forgot your password?
                      </CLink>
                    </Link>
                    <Button type="submit" isLoading={loginResult.fetching} role="submit">
                      Login
                    </Button>
                  </Flex>
                  <Link href="/register" passHref={true}>
                    <CLink textDecoration="underline" role="register-redirect">
                      New here?
                    </CLink>
                  </Link>
                </VStack>
              </Form>
            )}
          </Formik>
        </Box>
      </Center>
    </>
  );
};

export default Login;
