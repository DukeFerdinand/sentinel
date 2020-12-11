import { NextPage } from 'next';
import { SmartFetch } from '@dukeferdinand/ts-utils';

const { smartFetch, RequestMethods } = SmartFetch;

import Layout from '../components/layout';

interface HomeProps {
  data?: {
    message: string;
  };
  error?: {
    message: string;
  };
}

const Home: NextPage<HomeProps> = ({ data, error }) => {
  return (
    <Layout>
      {data ? (
        <div>Hello! props: {data.message}</div>
      ) : (
        <div>Error getting ip: {error?.message}</div>
      )}
    </Layout>
  );
};

Home.getInitialProps = async (ctx): Promise<HomeProps> => {
  const res = await smartFetch<{ message: string }, Error>(
    RequestMethods.GET,
    '/api/',
    {
      baseUrl: process.env.BASEURL,
    }
  );

  if (res.isOk()) {
    return {
      data: res.unwrap(),
    };
  } else {
    return {
      error: {
        message: `${res.unwrapErr().message}`,
      },
    };
  }
};

export default Home;
