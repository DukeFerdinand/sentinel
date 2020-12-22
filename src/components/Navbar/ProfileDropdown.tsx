import { useContext } from 'react';
import { Store } from '../../store';
import { GeneratedSVG } from '../Common/GeneratedSVG';

export const ProfileDropdown: React.FC = () => {
  const { user } = useContext(Store);
  return (
    <div className="flex mx-4 items-center cursor-pointer hover:bg-gray-100 rounded-md p-1 justify-between">
      <p className="mx-4">{user?.name}</p>
      <div className="rounded-full h-10 w-10 object-fill">
        <GeneratedSVG str={user?.name || 'user'} size={40} />
      </div>
    </div>
  );
};
