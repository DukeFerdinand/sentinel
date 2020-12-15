import { NextPage } from 'next';
import Link from 'next/link';
import { useRouter } from 'next/dist/client/router';
import { useContext } from 'react';
import { Store } from '../../store';
import { css } from '@emotion/react';

const AuthFormStyles = {
  Wrapper: css({
    alignItems: 'center',
    background: 'white',
    padding: '15px 50px',
    height: 300,
    borderRadius: 15,
    border: '1px solid #568ea6',
    margin: 'auto',
    color: '#4d4d4d',
    // h1: {
    // },
  }),
  AuthOptions: css({
    display: 'flex',
  }),
  Section: css({
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    width: '50%',
    minWidth: 325,
    padding: 10,
  }),
  Form: css({
    // display: 'flex',
    // justifyContent: 'center',
  }),

  FormElement: css({
    marginBottom: 10,
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
  }),
};

export const Register: NextPage = () => {
  const { user } = useContext(Store);
  const router = useRouter();

  // Users should not be able to access login or signup
  if (user) {
    router.replace('/');
  }

  return (
    <article css={AuthFormStyles.Wrapper}>
      <h1>Create an account</h1>
      <div css={AuthFormStyles.AuthOptions}>
        <section css={AuthFormStyles.Section}>
          <form css={AuthFormStyles.Form}>
            <div css={AuthFormStyles.FormElement}>
              <label htmlFor="email">Email</label>
              <input placeholder="email@email.com" name="email" type="email" />
            </div>
            <div css={AuthFormStyles.FormElement}>
              <label htmlFor="password">Password</label>
              <input placeholder="password" name="password" type="password" />
            </div>
          </form>
        </section>
        {/* <section css={AuthFormStyles.Section}>
          <div>Login with google</div>
        </section> */}
      </div>
      <Link href="/auth/login">
        <a>Already have an account?</a>
      </Link>
    </article>
  );
};

export default Register;
