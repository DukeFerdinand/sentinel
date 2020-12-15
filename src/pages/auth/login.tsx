import { NextPage } from 'next';
import Link from 'next/link';
import { useRouter } from 'next/dist/client/router';
import { useContext } from 'react';
import { Store } from '../../store';

export const Login: NextPage = () => {
  const { user } = useContext(Store);
  const router = useRouter();

  // Users should not be able to access login or signup
  if (user) {
    router.replace('/');
  }

  return (
    <div>
      <form>
        <label htmlFor="email">Email</label>
        <input name="email" type="text" />
      </form>
      <Link href="/auth/register">
        <a>Need an account?</a>
      </Link>
    </div>
  );
};

export default Login;
