import { FC, Fragment, useContext, useEffect, useState } from 'react';
import { NextPage } from 'next';
import { withApollo } from '../lib/apollo';
import { gql, useQuery } from '@apollo/client';
import { Store } from '../store';
import { UserAction } from '../store/actions';
import { useRouter } from 'next/dist/client/router';
import { User } from '../@generated/graphql';

export const USER_QUERY = gql`
  query UserQuery {
    user(id: "uuid") {
      id
      username
    }
  }
`;

// Temp array of routes
const ProtectedRoutes = ['/projects'];

const isProtectedRoute = (route: string): boolean => {
  for (const pr of ProtectedRoutes) {
    if (pr.includes(route) && route !== '/') {
      return true;
    }
  }

  return false;
};

export enum UserCheckState {
  Loading,
  Success,
  Error,
}

type PageWithUserCheck =
  | FC<{ userCheckStatus: UserCheckState }>
  | React.ComponentClass<{ userCheckStatus: UserCheckState }>;

export const userCheck = (PageComponent: PageWithUserCheck): NextPage => {
  const UserCheck: NextPage = (props) => {
    const router = useRouter();
    const { dispatch } = useContext(Store);
    const { data, error } = useQuery<{ user: User }>(USER_QUERY);
    const [userCheckStatus, setStatus] = useState(UserCheckState.Loading);

    useEffect(() => {
      if (data) {
        dispatch({ type: UserAction.SET_USER, payload: data.user });
      }
      if (error) {
        setStatus(UserCheckState.Error);
        if (isProtectedRoute(router.pathname)) {
          router.push('/auth/login');
        }
      }
    }, [data, dispatch, router, error, userCheckStatus, setStatus]);

    return (
      <Fragment>
        <PageComponent {...props} userCheckStatus={userCheckStatus} />
      </Fragment>
    );
  };

  return withApollo(UserCheck);
};
