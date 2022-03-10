import { Alert, AlertDescription, AlertIcon, Box, Button, Center, Flex, Heading, HStack, Link as CLink, VStack } from '@chakra-ui/react';
import InputField from '@components/InputField';
import registerMutation from '@graphql/mutations/registerMutation';
import { Form, Formik } from 'formik';
import type { NextPage } from 'next';
import Head from 'next/head';
import Link from 'next/link';
import { useState } from 'react';
import { useMutation } from 'urql';
import { errorMapper } from 'utils/errorMapper';

interface RegisterInputs {
  email: string;
  username: string;
  password: string;
  firstName: string;
  lastName: string;
  confirmPassword: string;
}

const Register: NextPage = () => {
  const [result, executeMutation] = useMutation(registerMutation);
  const [showAlert, setShowAlert] = useState(false);

  const handleOnSubmit = async (values: RegisterInputs, { setErrors }: any) => {
    const { email, username, password, firstName, lastName, confirmPassword } = values;
    if (password !== confirmPassword) {
      return setErrors({ confirmPassword: 'Passwords do not match' });
    }

    const data = await executeMutation({
      input: {
        email,
        username,
        password,
        firstName,
        lastName,
      },
    });

    if (data.error) {
      return setErrors(errorMapper(data.error as any));
    }
    setShowAlert(true);
  };

  return (
    <>
      <Head>
        <title>Register</title>
        <meta name="description" content="Register with Workout Buddy" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Center>
        <Box boxShadow="lg" p="6" w="xl">
          <Formik initialValues={{ email: '', username: '', password: '', confirmPassword: '', firstName: '', lastName: '' } as RegisterInputs} onSubmit={handleOnSubmit}>
            {() => (
              <Form>
                <VStack alignItems="stretch" spacing={6}>
                  {showAlert && (
                    <Alert status="info">
                      <AlertIcon />
                      <AlertDescription>A confirmation email has been sent. Please check your email and follow the link to confirm your account.</AlertDescription>
                    </Alert>
                  )}
                  <Heading textAlign={'center'}>Register</Heading>
                  <HStack alignItems={'baseline'}>
                    <InputField data-testid="form-input" name="firstName" label="First Name" placeholder="First Name" />
                    <InputField data-testid="form-input" name="lastName" label="Last Name" placeholder="Last Name" />
                  </HStack>
                  <InputField role="email" name="email" label="Email" placeholder="Email" data-testid="form-input" />
                  <InputField role="username" name="username" label="Username" placeholder="Username" data-testid="form-input" />
                  <InputField role="password" name="password" label="Password" placeholder="Password" type="password" data-testid="form-input" />
                  <InputField data-testid="form-input" role="confirm-password" name="confirmPassword" label="Confirm Password" placeholder="Confirm Password" type="password" />
                  <Flex w="100%" justifyContent={'flex-end'} alignItems="center">
                    <Button type="submit" isLoading={result.fetching} role="submit">
                      Register
                    </Button>
                  </Flex>
                  <Link href="/login" passHref={true}>
                    <CLink textDecoration="underline" role="login-redirect">
                      Already have an account?
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

export default Register;
