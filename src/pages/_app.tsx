import { RequestMethods, smartFetch } from '@dukeferdinand/ts-utils/dist/fetch';
import App, { AppContext, AppProps } from 'next/app';
import fetch from 'isomorphic-unfetch';

import Layout from '../components/Layout';
import { StateProvider } from '../store';
import { getCookies } from '../utils/cookies';
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

MyApp.getInitialProps = async (ctx: AppContext) => {
  const appProps = await App.getInitialProps(ctx);
  const cookies = getCookies<{ api_token?: string }>(
    ctx.ctx.req?.headers.cookie
  );

  if (cookies.api_token) {
    console.info(cookies.api_token);
    const res = await smartFetch(RequestMethods.GET, '/validate', {
      baseUrl: 'http://' + process.env.NEXT_PUBLIC_BASEURL,
      customFetch: fetch,
    });

    console.info(res);
  }

  return { ...appProps };
};

export default MyApp;
