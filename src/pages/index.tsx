import { NextPage } from 'next';
import { SmartFetch } from '@dukeferdinand/ts-utils';
import { gql, useQuery } from '@apollo/react-hooks';

import { withApollo } from '../lib/apollo';

const { smartFetch, RequestMethods } = SmartFetch;

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

export const Home: NextPage<HomeProps> = () => {
  const { data, loading, error } = useQuery<{ sayHello: string }>(HELLO_QUERY);

  if (!loading) {
    return <div>{data?.sayHello || 'Error'}</div>;
  } else {
    return <div>Loading</div>;
  }
};

export default withApollo(Home);
