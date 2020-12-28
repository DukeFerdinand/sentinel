import { NextPage } from 'next';
import Link from 'next/link';
import { useRouter } from 'next/dist/client/router';
import { useContext, useEffect } from 'react';
import { Store } from '../../store';
import gql from 'graphql-tag';
import { withApollo } from '../../lib/apollo';
import { useMutation } from '@apollo/client';
import { ErrorMessage, Field, Form, Formik } from 'formik';
import { User, UserInput } from '../../@generated/graphql';
import { UserAction } from '../../store/actions';
import Head from 'next/head';

export const REGISTER_MUTATION = gql`
  mutation register($user: UserInput!) {
    register(user: $user) {
      id
      email
      name
    }
  }
`;

export const Register: NextPage = () => {
  const { user, dispatch } = useContext(Store);
  const router = useRouter();
  const [register, { data, error, loading }] = useMutation(REGISTER_MUTATION);

  useEffect(() => {
    // Users should not be able to access login or signup
    if (user && !data) {
      router.replace('/projects');
    }
  }, [user, data, router]);

  const initialValues: UserInput = {
    email: '',
    password: '',
    name: '',
  };

  return (
    <article className="w-full h-full">
      <Head>
        <title>Register with Sentinel</title>
      </Head>
      <div className="grid md:grid-cols-6 lg:grid-cols-8">
        <section className="bg-white md:col-start-2 md:col-span-4 lg:col-start-3 lg:col-span-4 md:rounded-xl md:shadow md:border p-6 md:mt-20">
          <h1 className="text-2xl md:text-3xl font-bold mt-0">
            Create a Sentinel account
          </h1>
          <div className="grid grid-cols-6 md:divide-x md:divide-gray-200">
            <Formik
              initialErrors={{
                email: 'An account with that email already exists',
              }}
              initialValues={initialValues}
              onSubmit={async (values: UserInput, helpers) => {
                if (values.email && values.password && values.name) {
                  try {
                    const res = await register({
                      variables: {
                        user: values,
                      },
                    });
                    dispatch({
                      type: UserAction.SET_USER,
                      payload: res.data.register as User,
                    });
                    router.replace('/projects');
                  } catch (e) {
                    console.error('err =>', e);
                    if ((e.message as string) === 'Email already in use') {
                      helpers.setFieldError(
                        'email',
                        'An account with that email already exists'
                      );
                    }
                  }
                }
              }}
            >
              {({ errors }) => (
                <Form className="flex flex-col col-span-6 md:col-span-4 pt-4 md:pr-10">
                  <div className="flex flex-col items-start md:items-center justify-start mb-5">
                    <div className="w-full flex flex-col items-start md:items-center justify-start md:flex-row">
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
                    <ErrorMessage
                      render={(errorMessage: string) => (
                        <p className="text-red-600 text-center">
                          {errorMessage}
                        </p>
                      )}
                      name="email"
                    />
                  </div>
                  <div className="flex flex-col items-start md:items-center justify-start md:flex-row mb-5">
                    <label className="text-gray-700 text-lg" htmlFor="email">
                      Name
                    </label>
                    <Field
                      id="name"
                      name="name"
                      type="text"
                      className="rounded-md w-full md:ml-4"
                      placeholder="Full Name"
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
                    Create Account
                  </button>
                </Form>
              )}
            </Formik>

            <div className="col-span-6 mt-5 md:mt-0 md:col-span-2 flex items-center pb-8 justify-center">
              <Link href="/auth/login">
                <a className="underline hover:text-blue-800">
                  Already have an account?
                </a>
              </Link>
            </div>
          </div>
        </section>
      </div>
    </article>
  );
};

export default withApollo(Register);
