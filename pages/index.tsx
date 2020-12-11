import { Fragment } from 'react';
import { NextPage } from 'next';
import { SmartFetch } from '@dukeferdinand/ts-utils';

const { smartFetch, RequestMethods } = SmartFetch;

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
    <Fragment>
      {data ? (
        <div>Hello! props: {data.message}</div>
      ) : (
        <div>Error getting ip: {error?.message}</div>
      )}
    </Fragment>
  );
};

Home.getInitialProps = async (): Promise<HomeProps> => {
  // Vercel and similar hosting platforms give auto https
  const url = `${
    process.env.IS_LOCAL && process.env.IS_LOCAL !== 'false' ? 'http' : 'https'
  }://${process.env.BASEURL}`;
  const res = await smartFetch<{ message: string }, Error>(
    RequestMethods.GET,
    '/api/',
    {
      baseUrl: url,
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
