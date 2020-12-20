import { NextPage } from 'next';
import { Fragment } from 'react';
import { ProjectLayout } from '../../components/Projects/ProjectLayout';
import { withApollo } from '../../lib/apollo';

const NewProject: NextPage = () => {
  return (
    <ProjectLayout title="New Sentinel Project">
      <Fragment>
        <div>New Project Form</div>
      </Fragment>
    </ProjectLayout>
  );
};

export default withApollo(NewProject);
