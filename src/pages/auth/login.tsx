import { NextPage } from 'next';
import Link from 'next/link';
import { useRouter } from 'next/dist/client/router';
import { useContext, useEffect } from 'react';
import gql from 'graphql-tag';
import { useMutation } from '@apollo/client';
import { Field, Form, Formik } from 'formik';
import Head from 'next/head';

import { Store } from '../../store';
import { User, UserLogin } from '../../@generated/graphql';
import { withApollo } from '../../lib/apollo';
import { UserAction } from '../../store/actions';
import { Colors } from '../../styles/colors';

export const LOGIN_MUTATION = gql`
  mutation Login($user: UserLogin!) {
    login(user: $user) {
      id
      email
      name
    }
  }
`;

export const Login: NextPage = () => {
  const { user, dispatch } = useContext(Store);
  const router = useRouter();
  const [login, { data, error, loading }] = useMutation(LOGIN_MUTATION);

  useEffect(() => {
    // Users should not be able to access login or signup
    if (user && !data) {
      router.replace('/');
    }

    if (data) {
      dispatch({
        type: UserAction.SET_USER,
        payload: data as User,
      });
      router.replace('/organizations');
    }
  }, [user, data, dispatch, router]);

  const initialValues: UserLogin = {
    email: '',
    password: '',
  };

  return (
    <article className="w-full h-full">
      <Head>
        <title>Login to Sentinel</title>
      </Head>
      <div className="grid md:grid-cols-6 lg:grid-cols-8">
        <section className="bg-white md:col-start-2 md:col-span-4 lg:col-start-3 lg:col-span-4 md:rounded-xl md:shadow md:border p-6 md:mt-20">
          <h1 className="text-3xl font-bold mt-0">Login to Sentinel</h1>
          <div className="grid grid-cols-6 md:divide-x md:divide-gray-200">
            <Formik
              initialValues={initialValues}
              onSubmit={(values: UserLogin) => {
                console.info(values);
                if (values.email && values.password) {
                  login({
                    variables: {
                      user: values,
                    },
                  });
                }
              }}
            >
              <Form className="flex flex-col col-span-6 md:col-span-4 pt-4 md:pr-10">
                <div className="flex flex-col items-start md:items-center justify-start md:flex-row mb-5">
                  <label className="text-gray-700 text-lg" htmlFor="email">
                    Email
                  </label>
                  <Field
                    id="email"
                    name="email"
                    type="email"
                    className="rounded-md w-full md:ml-4"
                    placeholder="email@email.com"
                  />
                </div>
                <div className="flex flex-col items-start md:items-center justify-start md:flex-row mb-5">
                  <label className="text-gray-700 text-lg" htmlFor="password">
                    Password
                  </label>
                  <Field
                    id="password"
                    name="password"
                    type="password"
                    className="rounded-md w-full md:ml-4"
                    placeholder="Password"
                  />
                </div>
                <button
                  className="bg-blue-700 hover:bg-blue-800 rounded-md py-2 px-10 text-white"
                  type="submit"
                >
                  Login
                </button>
              </Form>
            </Formik>
            <div className="col-span-6 mt-5 md:mt-0 md:col-span-2 flex items-center pb-8 justify-center">
              <Link href="/auth/register">
                <a className="underline hover:text-blue-800">
                  Need an account?
                </a>
              </Link>
            </div>
          </div>
        </section>
      </div>
    </article>
  );
};

export default withApollo(Login);
