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
        <a className="mx-4">Login</a>
      </Link>
      <Link href="/auth/register">
        <a className="mx-4">Register</a>
      </Link>
    </>
  );
};

const AuthenticatedSection = () => {
  return (
    <>
      <Link href="/projects">
        <a className="mx-4 inline">Projects</a>
      </Link>
      <div>
        <ProfileDropdown />
      </div>
    </>
  );
};

export const Navbar: React.FC<NavbarProps> = ({ user }) => {
  return (
    <nav className="flex fixed w-full h-12 items-center justify-between px-6 bg-white text-gray-700 border-b border-gray-200 z-30">
      <div>
        <Link href="/">
          <a>
            <h1 className="text-3xl font-bold mt-0">Sentinel</h1>
          </a>
        </Link>
      </div>
      <div className="flex flex-row items-center justify-between">
        <Link href="/links">
          <a className="mx-4 inline">Links</a>
        </Link>
        <Link href="/about">
          <a className="mx-4 inline">About</a>
        </Link>
        {user ? <AuthenticatedSection /> : <RegistrationLinks />}
      </div>
    </nav>
  );
};
