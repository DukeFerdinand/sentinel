import Head from 'next/head';
import { Global } from '@emotion/react';
import { useContext, useEffect, useState, Fragment } from 'react';
import { RequestMethods, smartFetch } from '@dukeferdinand/ts-utils/dist/fetch';

import { GlobalStyles } from '../styles/globals';
import { AppBar } from './AppBar';
import { Store } from '../store';
import { Navbar } from './Navbar/Navbar';
import { getCookies, setCookie } from '../utils/cookies';
import { withUrl } from '../utils/withUrl';
import { User } from '../@generated/graphql';
import { UserAction } from '../store/actions';
import { FullScreenLoader } from './FullScreenLoader';

const Layout: React.FC = ({ children }) => {
  const { user, dispatch } = useContext(Store);

  // Only trigger loader if on server or an api token exists
  const initialLoadingState =
    !!getCookies<{ api_token: string }>()?.api_token ||
    typeof window === 'undefined';
  const [layoutLoading, setLoading] = useState(initialLoadingState);

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
            // If we get to this point, the key is bad or expired, so destroy it
            setCookie({
              key: 'api_token',
              data: undefined,
            });
          }

          // Async actions are done
          setLoading(false);
        }
      }
    };

    checkToken();
  }, [user, dispatch, layoutLoading, setLoading]);

  return (
    <main className="h-screen flex flex-col">
      <Head>
        <link
          href="https://fonts.googleapis.com/icon?family=Material+Icons"
          rel="stylesheet"
        />
        <link rel="preconnect" href="https://fonts.gstatic.com" />
        <link
          href="https://fonts.googleapis.com/css2?family=Open+Sans&family=Roboto:wght@300;400&display=swap"
          rel="stylesheet"
        />
      </Head>
      {/* Global style zone first */}
      <Global styles={GlobalStyles} />

      {layoutLoading ? (
        <FullScreenLoader />
      ) : (
        <Fragment>
          {/* Then any top level components */}
          <Navbar user={user} />
          {user && <AppBar />}

          {/* THEN the main flow */}
          <div className="flex-grow">{children}</div>
        </Fragment>
      )}
    </main>
  );
};

export default Layout;
