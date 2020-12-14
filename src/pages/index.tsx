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
    return <div>Got an error, check console.</div>;
  }

  if (loading) {
    return <div>Loading</div>;
  }

  // TODO: Figure out why there's an error here
  // when calling setUser() it calls setState in another component
  if (data) {
    setUser && setUser(data.user);
  }

  return <div>Hello, fake user {user?.username}!</div>;
};

export default withApollo(Home);
