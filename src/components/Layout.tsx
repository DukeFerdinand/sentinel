import Head from 'next/head';
import { Global } from '@emotion/react';
import { GlobalStyles } from '../styles/globals';
import { AppBar } from './AppBar';
import { useContext } from 'react';
import { Store } from '../store';

const Layout: React.FC = ({ children }) => {
  const { user } = useContext(Store);
  return (
    <main className="h-screen flex">
      <Head>
        <link rel="preconnect" href="https://fonts.gstatic.com" />
        <link
          href="https://fonts.googleapis.com/css2?family=Open+Sans&family=Roboto:wght@300;400&display=swap"
          rel="stylesheet"
        />
      </Head>
      {/* Global style zone first */}
      <Global styles={GlobalStyles} />

      {/* Then any top level components */}
      {user && <AppBar />}

      {/* THEN the main flow */}
      {children}
    </main>
  );
};

export default Layout;
