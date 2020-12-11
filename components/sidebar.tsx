import { css } from '@emotion/react';

const SidebarStyles = {
  Wrapper: css({
    background: '#F18C8E',
    height: '100vh',
    width: '220px',
  }),
};

export const Sidebar: React.FC = () => {
  return (
    <aside css={SidebarStyles.Wrapper}>
      <div>Sidebar</div>
    </aside>
  );
};
