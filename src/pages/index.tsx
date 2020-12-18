import { NextPage } from 'next';
import { gql } from '@apollo/react-hooks';
import { useContext, useEffect } from 'react';
import { useRouter } from 'next/dist/client/router';

import { Store } from '../store';
import Link from 'next/link';
import Head from 'next/head';

export const HELLO_QUERY = gql`
  query HelloQuery {
    sayHello
  }
`;

export const Home: NextPage = () => {
  const { user } = useContext(Store);
  const router = useRouter();

  return (
    <div>
      <Head>
        <title>Welcome to Sentinel</title>
      </Head>
      Welcome to sentinel!
      <Link href="/auth/login">
        <a>Go to login</a>
      </Link>
    </div>
  );
};

export default Home;
