import gql from 'graphql-tag';
import { NextPage } from 'next';
import { useRouter } from 'next/dist/client/router';
import { Fragment } from 'react';
import { ProjectLayout } from '../../../components/Projects/ProjectLayout';
import { withApollo } from '../../../lib/apollo';

// const PROJECT_ISSUES_QUERY = gql`
//   query projectIssuesQuery($projec)
// `

const ProjectIssues: NextPage = () => {
  const router = useRouter();

  return (
    <ProjectLayout title="Add project title here" showManagementBar={true}>
      <Fragment>
        <div className="flex flex-row">
          <h2 className="text-2xl">Issues</h2>
        </div>
        <div className="flex">
          Config: {JSON.stringify(router.query.project)}
        </div>
      </Fragment>
    </ProjectLayout>
  );
};

export default withApollo(ProjectIssues);
