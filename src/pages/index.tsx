import { NextPage } from 'next';
import { gql, useQuery } from '@apollo/react-hooks';

import { withApollo } from '../lib/apollo';
import { User } from '../@generated/graphql';
import { useContext } from 'react';
import { UserContext } from '../store';

interface HomeProps {
  data?: {
    message: string;
  };
  error?: {
    message: string;
  };
}

export const HELLO_QUERY = gql`
  query HelloQuery {
    sayHello
  }
`;

export const USER_QUERY = gql`
  query UserQuery {
    user(id: "uuid") {
      id
      username
    }
  }
`;

export const Home: NextPage<HomeProps> = () => {
  const { data, loading, error } = useQuery<{ user: User }>(USER_QUERY);

  const { user, setUser } = useContext(UserContext);

  if (error) {
    console.error(error);
  }

  if (loading) {
    return <div>Loading</div>;
  }

  if (data) {
    setUser && setUser(data.user);
    return <div>Hello, fake user {user?.username}!</div>;
  }

  return <div>Got an error, check console.</div>;
};

export default withApollo(Home);
