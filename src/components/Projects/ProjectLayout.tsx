import { useQuery } from '@apollo/client';
import gql from 'graphql-tag';
import Head from 'next/head';

import { Project } from '../../@generated/graphql';
import { authClient } from '../../lib/apolloClient';
import { ProjectStateProvider } from '../../store/projects';
import { ProjectManagementBar } from './ProjectManagementBar';
import { ProjectSidebar } from './ProjectSidebar';

interface ProjectLayoutProps {
  title: string;
  showManagementBar: boolean;
}

const ALL_PROJECTS_QUERY = gql`
  query allProjects {
    projects {
      id
      name
      language
      createdBy
    }
  }
`;

export const ProjectLayout: React.FC<ProjectLayoutProps> = ({
  children,
  showManagementBar,
  title,
}) => {
  const { data, loading, error } = useQuery<{ projects: Array<Project> }>(
    ALL_PROJECTS_QUERY,
    {
      client: authClient,
    }
  );

  return (
    <section className="h-full flex flex-row">
      <Head>
        <title>{title}</title>
      </Head>
      <ProjectStateProvider
        project={data?.projects[0] || undefined}
        projects={data?.projects || []}
      >
        <ProjectSidebar />
        <div className="flex-grow">
          {showManagementBar && <ProjectManagementBar />}
          <div className="px-10 py-3">{children}</div>
        </div>
      </ProjectStateProvider>
    </section>
  );
};
