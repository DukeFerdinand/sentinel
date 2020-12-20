import { useQuery } from '@apollo/client';
import gql from 'graphql-tag';
import { NextPage } from 'next';
import { useRouter } from 'next/dist/client/router';
import { useContext, useEffect } from 'react';
import { ApolloClient, createHttpLink, InMemoryCache } from '@apollo/client';
import { setContext } from '@apollo/client/link/context';

import { ProjectSidebar } from '../../components/Projects/ProjectSidebar';
import { withApollo } from '../../lib/apollo';
import { Store } from '../../store';
import { getCookies } from '../../utils/cookies';

const PROJECTS_QUERY = gql`
  query allProjects {
    projects {
      id
      name
      language
      createdBy
    }
  }
`;

const httpLink = createHttpLink({
  uri: '/api/graphql',
});

const authLink = setContext((_, { headers }) => {
  // get the authentication token from local storage if it exists
  const token = getCookies<{ api_token: string }>()?.api_token;
  // return the headers to the context so httpLink can read them
  return {
    headers: {
      ...headers,
      authorization: token || '',
    },
  };
});

const client = new ApolloClient({
  link: authLink.concat(httpLink),
  cache: new InMemoryCache(),
});

const Projects: NextPage = () => {
  const { user } = useContext(Store);
  const router = useRouter();

  const { data, error, loading } = useQuery(PROJECTS_QUERY, {
    client,
  });

  useEffect(() => {
    if (!user) {
      router.push('/auth/login');
    }
  }, [user, router]);

  return (
    <section className="h-full flex flex-row">
      <ProjectSidebar />
      <div className="px-10 py-5">
        <h1>Projects for {user?.name}</h1>
        <div>{JSON.stringify(data?.projects) || ''}</div>
      </div>
    </section>
  );
};

export default withApollo(Projects);
