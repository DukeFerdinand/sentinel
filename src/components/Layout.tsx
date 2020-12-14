import Head from 'next/head';
import { css, Global } from '@emotion/react';
import { GlobalStyles } from '../styles/globals';
import { AppBar } from './AppBar';
import { Breakpoints } from '../styles/breakpoints';
import { useContext } from 'react';
import { UserContext } from '../store';

const LayoutStyles = {
  Main: css({
    height: '100vh',
    display: 'flex',
    [Breakpoints.Tablet]: {
      flexDirection: 'column',
    },
  }),
};

const Layout: React.FC = ({ children }) => {
  const { user } = useContext(UserContext);
  return (
    <main css={LayoutStyles.Main}>
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
