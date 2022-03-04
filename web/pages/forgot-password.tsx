import { Center, Button, Box, VStack, Flex, Alert, AlertDescription, AlertIcon, Heading } from '@chakra-ui/react';
import InputField from 'components/InputField';
import forgotPasswordMutation from 'graphql/mutations/forgotPasswordMutation';
import { Form, Formik } from 'formik';
import { NextPage } from 'next';
import { useMutation } from 'urql';
import Head from 'next/head';

interface ForgotPasswordResponse {
  forgotPassword: string;
}

const ForgotPassword: NextPage = () => {
  const [result, executeMutation] = useMutation<ForgotPasswordResponse>(forgotPasswordMutation);

  const handleOnSubmit = async (values: { email: string }) => {
    const { email } = values;
    await executeMutation({
      email,
    });
  };

  return (
    <>
      <Head>
        <title>Forgot Password</title>
        <meta name="description" content="Forgot password" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Center>
        <Formik initialValues={{ email: '' }} onSubmit={handleOnSubmit}>
          {() => (
            <Form>
              <Box boxShadow="lg" p="6" w="xl">
                <VStack spacing={6}>
                  <Heading>Forgot Password</Heading>
                  {result.data && (
                    <Alert status="info">
                      <AlertIcon />
                      <AlertDescription>{result.data.forgotPassword}</AlertDescription>
                    </Alert>
                  )}
                  <InputField name="email" label="Email" placeholder="Email" />
                  <Flex justifyContent={'flex-end'} w="100%">
                    <Button type="submit" isLoading={false} role="submit">
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

export default ForgotPassword;
