import { useRouter } from 'next/dist/client/router';
import Link from 'next/link';
import { useContext, useState } from 'react';
import { Store } from '../../store';
import { UserAction } from '../../store/actions';
import { setCookie } from '../../utils/cookies';
import { GeneratedSVG } from '../Common/GeneratedSVG';

export const ProfileDropdown: React.FC = () => {
  const { user, dispatch } = useContext(Store);
  const router = useRouter();
  const [dropdownOpen, setDropdownOpen] = useState(false);

  const logout = () => {
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
  };

  return (
    <div className="relative mx-4 items-center cursor-pointer rounded-md p-1 justify-between">
      <div
        role="button"
        tabIndex={0}
        onKeyDown={(e) =>
          e.key === ' ' || (e.key === '\n' && setDropdownOpen(!dropdownOpen))
        }
        onClick={() => setDropdownOpen(!dropdownOpen)}
        className="flex items-center justify-center hover:bg-gray-100"
      >
        <p className="mx-4">{user?.name}</p>
        <div className="rounded-full h-10 w-10 object-fill">
          <GeneratedSVG str={user?.name || 'user'} size={40} />
        </div>
      </div>
      {dropdownOpen && (
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
      )}
    </div>
  );
};
