import { Alert, AlertDescription, AlertIcon, Box, Button, Center, Flex, Heading, VStack } from '@chakra-ui/react';
import InputField from '@components/InputField';
import resetPasswordMutation from '@graphql/mutations/resetPasswordMutation';
import { Formik, Form, FormikHelpers } from 'formik';
import { NextPage } from 'next';
import { useMutation } from 'urql';
import { errorMapper } from 'utils/errorMapper';
import { useRouter } from 'next/router';
import { useState } from 'react';
import Head from 'next/head';

interface PasswordInput {
  password: string;
  confirmPassword: string;
}

const ResetPassword: NextPage = () => {
  const [result, executeMutation] = useMutation(resetPasswordMutation);
  const [alertVisibility, setAlertVisibility] = useState(false);
  const router = useRouter();

  const handleOnSubmit = async (values: PasswordInput, { setErrors }: FormikHelpers<PasswordInput>) => {
    const { password, confirmPassword } = values;

    if (password !== confirmPassword) {
      return setErrors({ confirmPassword: 'Passwords do not match' });
    }

    const data = await executeMutation(
      {
        password: {
          password,
        },
      },
      {
        fetchOptions: {
          headers: {
            Authorization: router.query.token as string,
            email: router.query.email as string,
          },
        },
      }
    );

    if (data.error) {
      return setErrors(errorMapper(data.error as any));
    }

    setAlertVisibility(true);
  };

  return (
    <>
      <Head>
        <title>Reset Password</title>
        <meta name="description" content="Reset Password" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Center>
        <Formik initialValues={{ password: '', confirmPassword: '' }} onSubmit={handleOnSubmit}>
          {() => (
            <Form>
              <Box boxShadow="lg" p="6" w="xl">
                <VStack spacing={6}>
                  {alertVisibility && (
                    <Alert status="info">
                      <AlertIcon />
                      <AlertDescription>{result.data.resetPassword ? 'Password has been changed successfully' : 'Something went wrong'}</AlertDescription>
                    </Alert>
                  )}
                  <Heading>Reset Password</Heading>
                  <InputField onFocus={() => setAlertVisibility(false)} type="password" name="password" label="Password" placeholder="Password" />
                  <InputField onFocus={() => setAlertVisibility(false)} type="password" name="confirmPassword" label="Confirm Password" placeholder="Confirm Password" />
                  <Flex w="100%" justifyContent="flex-end">
                    <Button type="submit" isLoading={result.fetching} role="submit">
                      Submit
                    </Button>
                  </Flex>
                </VStack>
              </Box>
            </Form>
          )}
        </Formik>
      </Center>
    </>
  );
};

export default ResetPassword;
