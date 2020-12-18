import { css } from '@emotion/react';
import { useContext } from 'react';
import { Store } from '../store';
import { Breakpoints } from '../styles/breakpoints';

export const AppBar: React.FC = () => {
  const { user } = useContext(Store);

  return (
    <aside>
      <div>AppBar</div>
      <div>{user?.name}</div>
    </aside>
  );
};
