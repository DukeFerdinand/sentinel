import App from 'next/app';
import Layout from '../components/Layout';
import { StateProvider, Store } from '../store';

// import 'tailwindcss/tailwind.css';
import '../styles/globals.css';

class MyApp extends App {
  static contextType = Store;

  render(): JSX.Element {
    const { Component, pageProps } = this.props;

    return (
      <StateProvider>
        <Layout>
          <Component {...pageProps} />
        </Layout>
      </StateProvider>
    );
  }
}

export default MyApp;
