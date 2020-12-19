import Head from 'next/head';
import { Global } from '@emotion/react';
import { GlobalStyles } from '../styles/globals';
import { AppBar } from './AppBar';
import { useContext, useEffect } from 'react';
import { Store } from '../store';
import { Navbar } from './Navbar/Navbar';
import { RequestMethods, smartFetch } from '@dukeferdinand/ts-utils/dist/fetch';
import { getCookies, setCookie } from '../utils/cookies';
import { withUrl } from '../utils/withUrl';
import { User } from '../@generated/graphql';
import { UserAction } from '../store/actions';

const Layout: React.FC = ({ children }) => {
  const { user, dispatch } = useContext(Store);

  useEffect(() => {
    const checkToken = async () => {
      // Only run the user checker on the client side
      if (typeof window !== 'undefined' && !user) {
        const cookies = getCookies<{ api_token?: string }>();

        // Only attempt to validate the token if the token actually exists
        if (cookies?.api_token) {
          const res = await smartFetch<User, Error>(
            RequestMethods.POST,
            withUrl('/api/validate'),
            {
              headers: {
                cookie: window.document.cookie,
              },
            }
          );

          // The /api/validate function returns the user object directly,
          // so if good, just dispatch it
          if (res.isOk()) {
            dispatch({
              type: UserAction.SET_USER,
              payload: res.unwrap(),
            });
          } else {
            setCookie({
              key: 'api_token',
              data: undefined,
            });
          }
        }
      }
    };

    checkToken();
  }, [user, dispatch]);

  return (
    <main className="h-screen">
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
      <Navbar />
      {user && <AppBar />}

      {/* THEN the main flow */}
      <div className="pt-16">{children}</div>
    </main>
  );
};

export default Layout;
