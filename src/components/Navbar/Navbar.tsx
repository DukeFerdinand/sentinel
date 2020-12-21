import React from 'react';
import Link from 'next/link';
import { ProfileDropdown } from './ProfileDropdown';
import { User } from '../../@generated/graphql';

interface NavbarProps {
  user?: User;
}

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
      <Link href="/projects">
        <a className="mx-2 inline">Projects</a>
      </Link>
      <div>
        <ProfileDropdown />
      </div>
    </>
  );
};

export const Navbar: React.FC<NavbarProps> = ({ user }) => {
  return (
    <nav className="flex fixed w-full items-center justify-between px-6 bg-white text-gray-700 border-b border-gray-200 z-10">
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