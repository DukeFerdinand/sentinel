import { css } from '@emotion/react';

const AppBarStyles = {
  Wrapper: css({
    background: '#F18C8E',
    height: '100vh',
    width: '220px',
  }),
};

export const AppBar: React.FC = () => {
  return (
    <aside css={AppBarStyles.Wrapper}>
      <div>AppBar</div>
    </aside>
  );
};
