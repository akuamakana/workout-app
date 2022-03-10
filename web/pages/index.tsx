import { Button, HStack, Text } from '@chakra-ui/react';
import logoutMutation from '@graphql/mutations/logoutMutation';
import meQuery from '@graphql/queries/meQuery';
import type { NextPage } from 'next';
import Head from 'next/head';
import { useRouter } from 'next/router';
import IUser from 'types/IUser';
import { useMutation, useQuery } from 'urql';

interface MeResponse {
  me: IUser;
}

const Index: NextPage = () => {
  const router = useRouter();
  const [result, _] = useQuery<MeResponse>({
    query: meQuery,
  });
  const [__, executeLogoutMutation] = useMutation(logoutMutation);

  const logoutOnClick = async () => {
    try {
      await executeLogoutMutation();
      router.push('/login');
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <>
      <Head>
        <title>Workout Buddy</title>
        <meta name="description" content="Workout Buddy" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <HStack justifyContent="flex-end">
        <Text role="welcome">Welcome, {result.data?.me ? result.data.me.firstName : 'user'}</Text>
        <Button role="logout" colorScheme="red" onClick={logoutOnClick}>
          Logout
        </Button>
      </HStack>
    </>
  );
};

export default Index;
