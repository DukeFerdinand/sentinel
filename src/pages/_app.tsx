import App from 'next/app';
import { ContextProviders } from '../components/ContextProviders';
import Layout from '../components/Layout';
import { Context } from '../store';

class MyApp extends App {
  static contextType = Context;

  render(): JSX.Element {
    const { Component, pageProps } = this.props;

    return (
      <ContextProviders>
        <Layout>
          <Component {...pageProps} />
        </Layout>
      </ContextProviders>
    );
  }
}

export default MyApp;
