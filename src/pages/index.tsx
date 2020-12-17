import { NextPage } from 'next';
import { gql } from '@apollo/react-hooks';
import { useContext, useEffect } from 'react';
import { useRouter } from 'next/dist/client/router';

import { Store } from '../store';
import { userCheck, UserCheckState } from '../hoc/withUser';
import Link from 'next/link';

interface HomeProps {
  userCheckStatus: UserCheckState;
}

export const HELLO_QUERY = gql`
  query HelloQuery {
    sayHello
  }
`;

export const Home: NextPage<HomeProps> = ({ userCheckStatus }) => {
  const { user } = useContext(Store);
  const router = useRouter();

  return (
    <div>
      Welcome to sentinel!
      <Link href="/auth/login">
        <a>Go to login</a>
      </Link>
    </div>
  );
};

export default userCheck(Home);
