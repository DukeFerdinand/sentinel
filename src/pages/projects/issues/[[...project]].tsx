import { useQuery } from '@apollo/client';
import gql from 'graphql-tag';
import { NextPage } from 'next';
import { useRouter } from 'next/dist/client/router';
import { Fragment, useContext } from 'react';
import { Query } from '../../../@generated/graphql';
import { formatProjectName } from '../../../api/utils';
import { ProjectLayout } from '../../../components/Projects/ProjectLayout';
import { withApollo } from '../../../lib/apollo';
import { authClient } from '../../../lib/apolloClient';
import { ProjectStore } from '../../../store/projects';

const PROJECT_ISSUES_QUERY = gql`
  query ProjectIssuesQuery($projectId: String!, $env: String!) {
    issues(projectId: $projectId, environment: $env) {
      issues {
        id
        title
        issueType
        open
        stack
        extra
        handled
      }
      count
    }
  }
`;

const ProjectIssues: React.FC = () => {
  const router = useRouter();
  const { project, selectedEnv } = useContext(ProjectStore);

  const { data, loading, error } = useQuery<Pick<Query, 'issues'>>(
    PROJECT_ISSUES_QUERY,
    {
      client: authClient,
      skip: !project || !selectedEnv,
      variables: {
        projectId: project?.id,
        env: selectedEnv?.name,
      },
    }
  );

  if (!router.query.project && project) {
    router.push(`/projects/issues/${formatProjectName(project.name)}`);
  }

  return (
    <Fragment>
      <div className="flex flex-row">
        <h2 className="text-2xl">Issues</h2>
      </div>
      <div className="flex">Config: {JSON.stringify(router.query.project)}</div>

      {/* Loading, render skeleton table */}
      {(loading || (!data && !error)) && <div>Loading issues...</div>}

      {/* Error, render message along with basic table for UI continuity*/}
      {error && <div>Error: {JSON.stringify(error)}</div>}

      {/* Data all good, render the full table */}
      {data && <div>{JSON.stringify(data.issues)}</div>}
    </Fragment>
  );
};

const ProjectIssuesPage: NextPage = () => {
  return (
    <ProjectLayout title="Add project title here" showManagementBar={true}>
      <ProjectIssues />
    </ProjectLayout>
  );
};

export default withApollo(ProjectIssuesPage);
