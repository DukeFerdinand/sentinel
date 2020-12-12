import { Fragment } from 'react';
import { GetServerSideProps, NextPage } from 'next';
import { SmartFetch } from '@dukeferdinand/ts-utils';
import { withUrl } from '../utils/withUrl';

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

export const getServerSideProps: GetServerSideProps<HomeProps> = async () => {
  const res = await smartFetch<{ message: string }, Error>(
    RequestMethods.GET,
    '/api/',
    {
      baseUrl: withUrl(),
    }
  );

  if (res.isOk()) {
    return {
      props: {
        data: res.unwrap(),
      },
    };
  } else {
    return {
      props: {
        error: {
          message: `${res.unwrapErr().message}`,
        },
      },
    };
  }
};

export default Home;
