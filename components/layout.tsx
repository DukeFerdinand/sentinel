import { css, Global } from '@emotion/react';
import { GlobalStyles } from '../styles/globals';

const LayoutStyles = {
  Main: css({
    height: '100vh',
    display: 'flex',
    justifyContent: 'center',
  }),
};

const Layout: React.FC = ({ children }) => {
  return (
    <main css={LayoutStyles.Main}>
      <Global styles={GlobalStyles} />
      {children}
    </main>
  );
};

export default Layout;
