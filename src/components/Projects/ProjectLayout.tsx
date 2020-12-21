import { useQuery } from '@apollo/client';
import gql from 'graphql-tag';
import Head from 'next/head';
import { Fragment, useContext, useEffect } from 'react';

import { Project } from '../../@generated/graphql';
import { authClient } from '../../lib/apolloClient';
import { ProjectAction } from '../../store/actions';
import {
  ProjectState,
  ProjectStateProvider,
  ProjectStore,
} from '../../store/projects';
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

const ProjectLayoutWithState: React.FC<
  Pick<ProjectLayoutProps, 'showManagementBar'>
> = ({ children, showManagementBar }) => {
  const { project, dispatch } = useContext(ProjectStore);
  const { data, loading, error } = useQuery<{ projects: Array<Project> }>(
    ALL_PROJECTS_QUERY,
    {
      client: authClient,
    }
  );

  useEffect(() => {
    if (data) {
      dispatch({
        type: ProjectAction.INIT_STATE,
        payload: {
          projects: data.projects,
          // Eventually we should enable a default selection
          project: project || data.projects[0],
        } as ProjectState,
      });
    }
  }, [data, dispatch, project]);

  return (
    <Fragment>
      <ProjectSidebar />
      <div className="flex-grow">
        {showManagementBar && <ProjectManagementBar />}
        <div className="px-10 py-3">{children}</div>
      </div>
    </Fragment>
  );
};

export const ProjectLayout: React.FC<ProjectLayoutProps> = ({
  children,
  showManagementBar,
  title,
}) => {
  return (
    <section className="h-full flex flex-row">
      <Head>
        <title>{title}</title>
      </Head>
      <ProjectStateProvider project={undefined} projects={[]}>
        <ProjectLayoutWithState showManagementBar={showManagementBar}>
          {children}
        </ProjectLayoutWithState>
      </ProjectStateProvider>
    </section>
  );
};
