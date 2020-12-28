import { useQuery } from '@apollo/client';
import gql from 'graphql-tag';
import Head from 'next/head';
import { useContext, useEffect } from 'react';

import {
  Project,
  Query,
  QueryEnvironmentsArgs,
} from '../../@generated/graphql';
import { authClient } from '../../lib/apolloClient';
import { ProjectAction } from '../../store/actions';
import { ProjectState, ProjectStore } from '../../store/projects';
import { ProjectManagementBar } from './ProjectManagementBar';
import { ProjectSidebar } from './ProjectSidebar';

interface ProjectLayoutProps {
  title: string;
  showManagementBar: boolean;
}

// Queries

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

const ALL_ENVIRONMENTS_QUERY = gql`
  query EnvironmentsForProject($projectId: String!) {
    environments(projectId: $projectId) {
      name
      total
    }
  }
`;

export const ProjectLayout: React.FC<ProjectLayoutProps> = ({
  children,
  showManagementBar,
  title,
}) => {
  const { project, projects, environments, dispatch } = useContext(
    ProjectStore
  );
  const { data, loading, error } = useQuery<{ projects: Array<Project> }>(
    ALL_PROJECTS_QUERY,
    {
      client: authClient,
    }
  );

  const { data: envData, loading: envLoading, error: envError } = useQuery<
    Pick<Query, 'environments'>
  >(ALL_ENVIRONMENTS_QUERY, {
    client: authClient,
    // Can't get environments without a project
    skip: !project,
    variables: {
      projectId: project?.id,
    },
  });

  useEffect(() => {
    if (data && !(project || projects.length)) {
      console.log(data, projects.length, project);
      dispatch({
        type: ProjectAction.INIT_STATE,
        payload: {
          projects: data.projects,
          // Eventually we should enable a default selection
          project: project || data.projects[0],
        } as ProjectState,
      });
    }

    if (envData && environments.length === 0) {
      console.info('dispatching environments');
      dispatch({
        type: ProjectAction.SET_AVAILABLE_ENVIRONMENTS,
        payload: envData.environments,
      });
    }
  }, [data, envData, dispatch, project, projects, environments]);

  console.info('[ENV QUERY]', envData, envLoading, envError);

  return (
    <section className="h-full flex flex-row">
      <Head>
        <title>{title}</title>
      </Head>
      <ProjectSidebar />
      <div className="flex-grow">
        {showManagementBar && <ProjectManagementBar />}
        <div className="px-10 py-3">{children}</div>
      </div>
    </section>
  );
};
