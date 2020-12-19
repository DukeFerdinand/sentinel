import { AppProps } from 'next/app';

import Layout from '../components/Layout';
import { StateProvider } from '../store';
import '../styles/globals.css';

const MyApp = ({ Component, pageProps }: AppProps): JSX.Element => {
  return (
    <StateProvider>
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </StateProvider>
  );
};

export default MyApp;
