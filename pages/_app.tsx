import App from 'next/app';
import Layout from '../components/Layout';
import { Context } from '../store';

class MyApp extends App {
  static contextType = Context;

  render(): JSX.Element {
    const { Component, pageProps } = this.props;

    return (
      <Layout>
        <Context.Provider
          value={{
            fetchConfig: {
              // TODO: Make this dynamic before pushing to hosting
              baseUrl: 'http://localhost',
            },
          }}
        >
          <Component {...pageProps} />
        </Context.Provider>
      </Layout>
    );
  }
}

export default MyApp;
