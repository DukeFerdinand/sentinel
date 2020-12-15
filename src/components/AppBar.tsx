import { css } from '@emotion/react';
import { useContext } from 'react';
import { Store } from '../store';
import { Breakpoints } from '../styles/breakpoints';

const AppBarStyles = {
  Wrapper: css({
    background: '#F18C8E',
    height: '100vh',
    width: '220px',
    [Breakpoints.Tablet]: {
      height: '90px',
      width: '100vw',
    },
  }),
};

export const AppBar: React.FC = () => {
  const { user } = useContext(Store);

  return (
    <aside css={AppBarStyles.Wrapper}>
      <div>AppBar</div>
    </aside>
  );
};
