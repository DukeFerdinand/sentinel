import { useRouter } from 'next/dist/client/router';
import Link from 'next/link';
import { useContext, useState } from 'react';
import { User } from '../../@generated/graphql';
import { Store } from '../../store';
import { UserAction } from '../../store/actions';
import { setCookie } from '../../utils/cookies';
import { GeneratedSVG } from '../Common/GeneratedSVG';

const ProfileDropdownActivator: React.FC<{
  user?: User;
  onClick: () => void;
}> = ({ user, onClick }) => {
  return (
    <div
      role="button"
      tabIndex={0}
      onKeyDown={(e) => e.key === ' ' || (e.key === '\n' && onClick())}
      onClick={() => onClick()}
      className="flex items-center justify-center hover:bg-gray-100"
    >
      <p className="mx-4">{user?.name}</p>
      <div className="rounded-full h-10 w-10 object-fill">
        <GeneratedSVG str={user?.name || 'user'} size={40} />
      </div>
    </div>
  );
};

const ProfileDropdownContent: React.FC<{
  logout: () => void;
  showDropdown: boolean;
}> = ({ logout, showDropdown }) => {
  return showDropdown ? (
    <div className="absolute bg-white w-full border divide-y rounded-md shadow-md top-full right-0 flex flex-col">
      <Link href="/profile">
        <a className="hover:bg-gray-100 h-12 flex items-center justify-center">
          Profile
        </a>
      </Link>
      <button
        onClick={() => logout()}
        className="hover:bg-gray-100 text-red-600 h-12"
      >
        Logout
      </button>
    </div>
  ) : null;
};

export const ProfileDropdown: React.FC = () => {
  const { user, dispatch } = useContext(Store);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const router = useRouter();

  return (
    <div className="relative mx-4 items-center cursor-pointer rounded-md p-1 justify-between">
      <ProfileDropdownActivator
        onClick={() => setDropdownOpen(!dropdownOpen)}
        user={user}
      />
      <ProfileDropdownContent
        showDropdown={dropdownOpen}
        logout={() => {
          // First clear the cookie
          setCookie({
            key: 'api_token',
            data: undefined,
          });

          // Then clear in-memory
          dispatch({
            type: UserAction.LOGOUT,
            payload: undefined,
          });

          // Then redirect
          router.push('/');
        }}
      />
    </div>
  );
};
