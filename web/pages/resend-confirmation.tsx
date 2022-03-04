import { Center, Box, VStack, Heading, Alert, AlertIcon, AlertDescription, Flex, Button } from '@chakra-ui/react';
import InputField from '@components/InputField';
import sendVerificationMutation from '@graphql/mutations/sendVerificationMutation';
import { Formik, Form } from 'formik';
import { NextPage } from 'next';
import Head from 'next/head';
import { useMutation } from 'urql';

const ResendConfirmation: NextPage = () => {
  const [result, executeMutation] = useMutation<{ sendVerification: boolean }>(sendVerificationMutation);

  const handleOnSubmit = async (values: { email: string }) => {
    const { email } = values;
    await executeMutation({
      email,
    });
  };

  return (
    <>
      <Head>
        <title>Resend Confirmation</title>
        <meta name="description" content="Resend Confirmation" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Center>
        <Formik initialValues={{ email: '' }} onSubmit={handleOnSubmit}>
          {() => (
            <Form>
              <Box boxShadow="lg" p="6" w="xl">
                <VStack spacing={6}>
                  <Heading>Resend Confirmation Email</Heading>
                  {result.data && (
                    <Alert status="info">
                      <AlertIcon />
                      <AlertDescription>{result.data.sendVerification && 'Email has been sent to the requested email address.'}</AlertDescription>
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

export default ResendConfirmation;
