import React from 'react';
import Link from 'next/link';
import { useContext } from 'react';
import { Store } from '../../store';
import { ProfileDropdown } from './ProfileDropdown';

const RegistrationLinks = () => {
  return (
    <>
      <Link href="/auth/login">
        <a className="mx-2">Login</a>
      </Link>
      <Link href="/auth/register">
        <a className="mx-2">Register</a>
      </Link>
    </>
  );
};

const AuthenticatedSection = () => {
  return (
    <>
      <Link href="/auth/login">
        <a className="mx-2 inline">Organizations</a>
      </Link>
      <div>
        <ProfileDropdown />
      </div>
    </>
  );
};

export const Navbar: React.FC = () => {
  const { user } = useContext(Store);
  console.info(user);
  return (
    <nav className="flex fixed w-full items-center justify-between px-6 h-16 bg-white text-gray-700 border-b border-gray-200 z-10">
      <div>
        <Link href="/">
          <a>
            <h1 className="text-3xl font-bold mt-0">Sentinel</h1>
          </a>
        </Link>
      </div>
      <div className="flex flex-row items-center justify-between">
        {user ? <AuthenticatedSection /> : <RegistrationLinks />}
      </div>
    </nav>
  );
};
