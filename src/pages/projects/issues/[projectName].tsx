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
    <ProjectLayout title="">
      <Fragment>
        <div>Selected: {router.query.projectName}</div>
      </Fragment>
    </ProjectLayout>
  );
};

export default withApollo(ProjectIssues);
