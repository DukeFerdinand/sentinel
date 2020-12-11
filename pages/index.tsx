import { GetServerSideProps, NextPage } from 'next';
import { SmartFetch } from '@dukeferdinand/ts-utils';

const { smartFetch, RequestMethods } = SmartFetch;

import Layout from '../components/layout';
// import styles from '../styles/Home.module.css';

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
        <div>Error getting ip: {error}</div>
      )}
    </Layout>
  );
};

export const getServerSideProps: GetServerSideProps<HomeProps> = async (
  context
) => {
  console.info(context);
  const res = await smartFetch<{ message: 'graphql!' }, Error>(
    RequestMethods.GET,
    '/'
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
        error: res.unwrapErr(),
      },
    };
  }
};

export default Home;
