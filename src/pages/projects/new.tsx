import { Formik } from 'formik';
import { NextPage } from 'next';
import { Fragment } from 'react';
import { ProjectLayout } from '../../components/Projects/ProjectLayout';
import { withApollo } from '../../lib/apollo';

const NewProject: NextPage = () => {
  return (
    <ProjectLayout title="New Sentinel Project" showManagementBar={false}>
      <Fragment>
        <div className="flex flex-row mb-4">
          <h2 className="text-2xl">New Project</h2>
        </div>
        <div className="flex flex-col">
          <div className="flex-grow border rounded-md p-4 shadow-md">
            <h5 className="text-xl">Project Name</h5>
            <p className="mb-4">
              A unique (to your user) name to give your project. Don&apos;t
              worry, this can be changed later if you decide on a different
              name!
            </p>
            <input
              className="rounded-md"
              type="text"
              minLength={4}
              maxLength={20}
              placeholder="Project Name"
            />
          </div>
        </div>
      </Fragment>
    </ProjectLayout>
  );
};

export default withApollo(NewProject);
