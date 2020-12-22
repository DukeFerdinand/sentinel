import { AppProps } from 'next/app';

import Layout from '../components/Layout';
import { StateProvider } from '../store';
import { ProjectStateProvider } from '../store/projects';
import '../styles/globals.css';

const MyApp = ({ Component, pageProps }: AppProps): JSX.Element => {
  return (
    // User/main state first
    <StateProvider>
      {/* Then dependent project state */}
      <ProjectStateProvider>
        <Layout>
          <Component {...pageProps} />
        </Layout>
      </ProjectStateProvider>
    </StateProvider>
  );
};

export default MyApp;
