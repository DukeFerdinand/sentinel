import { css } from '@emotion/react';
import { useContext } from 'react';
import { Breakpoints } from '../styles/breakpoints';

const DemoBarStyles = {
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

export const DemoBar: React.FC = () => {
  return (
    <aside css={DemoBarStyles.Wrapper}>
      <div>DemoBar</div>
    </aside>
  );
};
