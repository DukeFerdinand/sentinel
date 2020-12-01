import { AppProps } from 'next/dist/next-server/lib/router/router';
import { ReactNode } from 'react';

//! This return type might be wrong, so if anything screwy happens, look here
function MyApp({ Component, pageProps }: AppProps): ReactNode {
  return <Component {...pageProps} />;
}

export default MyApp;
