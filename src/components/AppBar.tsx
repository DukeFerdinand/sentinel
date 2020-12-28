import { useContext } from 'react';
import { Store } from '../store';

export const AppBar: React.FC = () => {
  const { user } = useContext(Store);

  return (
    <aside>
      <div>AppBar</div>
      <div>{user?.name}</div>
    </aside>
  );
};
