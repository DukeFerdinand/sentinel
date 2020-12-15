import { NextPage } from 'next';
import { gql } from '@apollo/react-hooks';
import { useContext } from 'react';
import { useRouter } from 'next/dist/client/router';

import { Store } from '../store';
import { userCheck, UserCheckState } from '../hoc/withUser';

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

  console.info('check status', userCheckStatus);

  return <div>Welcome to sentinel!</div>;
};

export default userCheck(Home);
