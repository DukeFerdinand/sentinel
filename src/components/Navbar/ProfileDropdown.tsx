import { useContext } from 'react';
import { Store } from '../../store';

export const ProfileDropdown = () => {
  const { user } = useContext(Store);
  return (
    <div className="flex mx-4 items-center cursor-pointer hover:bg-gray-100 rounded-md p-1 justify-between">
      <p className="mx-4">{user?.name}</p>
      <div className="rounded-full h-10 w-10 object-fill">
        <img
          alt="Profile"
          src="https://www.tinygraphs.com/labs/isogrids/hexa16/Boof-Flynn?theme=frogideas&numcolors=4&size=220&fmt=svg"
        />
      </div>
    </div>
  );
};
