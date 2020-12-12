import { NextPage, NextPageContext } from 'next';
import {
  ApolloClient,
  InMemoryCache,
  HttpLink,
  ApolloProvider,
  NormalizedCacheObject,
} from '@apollo/client';
import fetch from 'isomorphic-unfetch';

import { withUrl } from '../utils/withUrl';
import Head from 'next/head';
import { ReactNode } from 'react';

interface ApolloContext extends NextPageContext {
  apolloClient: ApolloClient<NormalizedCacheObject> | undefined;
}

interface WithApolloProps {
  apolloClient?: ApolloClient<NormalizedCacheObject>;
  apolloState?: NormalizedCacheObject;
}

/**
 * QUICK explanation here:
 * This HOC runs twice technically, once on the server, once on the client.
 * Because of that, we need to make sure both use cases are covered :)
 */
export function withApollo(PageComponent: NextPage): NextPage {
  const WithApollo: NextPage<WithApolloProps & { children?: ReactNode }> = ({
    apolloClient,
    apolloState,
    ...pageProps
  }) => {
    /**
     * pageProps here is anything retrieved from the wrapped
     * `getInitialProps` call.
     */

    const client = apolloClient || initApolloClient(apolloState);

    return (
      <ApolloProvider client={client}>
        <PageComponent {...pageProps} />
      </ApolloProvider>
    );
  };

  /**
   * Since we're wrapping a "NextPage" with a "NextPage" HOC
   * we can use an extra getInitialProps to call apollo stuff
   * in an extracted way
   */
  WithApollo.getInitialProps = async (ctx: ApolloContext) => {
    // AppTree is Next.js specific access to our app tree on the server
    const { AppTree } = ctx;

    // Init an apollo client if not available so we can make a gql request
    const apolloClient = (ctx.apolloClient = initApolloClient());

    /**
     * Again because we're wrapping "NextPage" components,
     * we could potentially have another `getInitialProps` to await
     * outside of our normal apollo props.
     *
     * This allows for special non-gql data to be populated on the server still
     * while not affecting any components that don't care about non-gql data
     */
    let pageProps = {};
    if (PageComponent.getInitialProps) {
      pageProps = await PageComponent.getInitialProps(ctx);
    }

    // Server Side code
    if (typeof window === 'undefined') {
      if (ctx.res && ctx.res.writableEnded) {
        return pageProps;
      }

      /**
       * Because we have the potential to add GQL queries in our wrapped
       * components, we need to render those out here so our apollo
       * data can be hydrated on the server
       */
      try {
        const { getDataFromTree } = await import('@apollo/react-ssr');

        await getDataFromTree(
          <AppTree pageProps={{ ...pageProps, apolloClient }} />
        );
      } catch (e) {
        console.error(e);
      }

      // AppTree doesn't call unmount, fix that manually
      Head.rewind();
    }

    /**
     * Apollo state is initialized in the `getDataFromTree`
     * call from the server block above.
     *
     * We can now pass that to the client as `getInitialProps`
     * is meant to be used, along with any pageProps retrieved from other
     * unrelated `getInitialProps` that the wrapped component may need
     */
    const apolloState = apolloClient.cache.extract();

    return {
      ...pageProps,
      apolloState,
    };
  };

  return WithApollo;
}

const initApolloClient = (initialState = {}) => {
  // Separate client and server code
  const ssrMode = typeof window === 'undefined';

  const cache = new InMemoryCache().restore(initialState);
  const link = new HttpLink({
    uri: withUrl('/api/graphql'),
    fetch,
  });
  const client = new ApolloClient({
    ssrMode,
    link,
    cache,
  });
  return client;
};
