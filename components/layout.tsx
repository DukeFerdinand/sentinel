import Head from 'next/head';
import { css, Global } from '@emotion/react';
import { GlobalStyles } from '../styles/globals';
import { Sidebar } from './sidebar';

const LayoutStyles = {
  Main: css({
    height: '100vh',
    display: 'flex',
  }),
};

const Layout: React.FC = ({ children }) => {
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
      <Sidebar />

      {/* THEN the main flow */}
      {children}
    </main>
  );
};

export default Layout;
