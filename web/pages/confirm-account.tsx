import { Center, Heading, Text } from '@chakra-ui/react';
import confirmEmailMutation from '@graphql/mutations/confirmEmailMutation';
import { NextPage } from 'next';
import Head from 'next/head';
import { useRouter } from 'next/router';
import { useEffect } from 'react';
import { useMutation } from 'urql';
import Link from 'next/link';

const ConfirmAccount: NextPage = () => {
  const [_, executeMutation] = useMutation(confirmEmailMutation);
  const router = useRouter();

  useEffect(() => {
    const mutate = async () => {
      try {
        if (router.query) {
          await executeMutation(
            {},
            {
              fetchOptions: {
                headers: {
                  Authorization: router.query.token as string,
                  email: router.query.email as string,
                },
              },
            }
          );
        }
      } catch (error) {
        console.error(error);
      }
    };

    mutate();
  }, [router.query, executeMutation]);

  return (
    <>
      <Head>
        <title>Confirm Account</title>
        <meta name="description" content="Confirm account" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Center flexDirection={'column'}>
        <Heading>Confirm Account</Heading>
        <Text>Confirmed!</Text>
        <Link href="/login" passHref={true}>
          Click here to login
        </Link>
      </Center>
    </>
  );
};

export default ConfirmAccount;
