import gql from 'graphql-tag';
import { NextPage } from 'next';
import { useRouter } from 'next/dist/client/router';
import { Fragment, useContext } from 'react';
import { formatProjectName } from '../../../api/utils';
import { ProjectLayout } from '../../../components/Projects/ProjectLayout';
import { withApollo } from '../../../lib/apollo';
import { ProjectStore } from '../../../store/projects';

// const PROJECT_ISSUES_QUERY = gql`
//   query projectIssuesQuery($projec)
// `

const ProjectIssues: React.FC = () => {
  const router = useRouter();
  const { project } = useContext(ProjectStore);

  if (!router.query.project && project) {
    router.push(`/projects/issues/${formatProjectName(project.name)}`);
  }

  return (
    <Fragment>
      <div className="flex flex-row">
        <h2 className="text-2xl">Issues</h2>
      </div>
      <div className="flex">Config: {JSON.stringify(router.query.project)}</div>
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
