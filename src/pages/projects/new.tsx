import { Field, Form, Formik } from 'formik';
import { NextPage } from 'next';
import { Fragment } from 'react';
import { ProjectLayout } from '../../components/Projects/ProjectLayout';
import { withApollo } from '../../lib/apollo';

interface NewProjectForm {
  name: string;
  language: string;
}

const NewProject: NextPage = () => {
  const initialFormValues: NewProjectForm = {
    name: '',
    language: 'Node.js',
  };
  return (
    <ProjectLayout title="New Sentinel Project" showManagementBar={false}>
      <Fragment>
        <div className="flex flex-row mb-4">
          <h2 className="text-2xl">New Project</h2>
        </div>
        <Formik
          initialValues={initialFormValues}
          onSubmit={(values) => {
            console.info(values);
          }}
        >
          <Form className="flex flex-col">
            <div className="flex-grow flex md:flex-col lg:flex-row border rounded-md p-4 shadow-md mb-4">
              <div className="md:w-full lg:w-1/2">
                <h5 className="text-xl">Project Name</h5>
                <p className="mb-4">
                  A unique (to your user) name to give your project. Don&apos;t
                  worry, this can be changed later if you decide on a different
                  name!
                </p>
              </div>
              <div className="flex flex-row mx-auto items-center justify-center md:w-full lg:w-1/4">
                <Field
                  className="rounded-md w-full"
                  type="text"
                  name="name"
                  minLength={4}
                  maxLength={20}
                  placeholder="Project Name"
                />
              </div>
            </div>
            <div className="flex-grow flex md:flex-col lg:flex-row border rounded-md p-4 shadow-md">
              <div className="md:w-full lg:w-1/2">
                <h5 className="text-xl">Project Language</h5>
                <p className="mb-4">
                  The programming language (or framework) used in your
                  application. All projects will use HTTP(S) for now, but this
                  will be more useful once more libraries (Node.js, Python, Go,
                  etc.) are implemented. You <i>are</i> able to change this
                  later!
                </p>
              </div>
              <div className="flex flex-row mx-auto items-center justify-center md:w-full lg:w-1/4">
                <Field
                  className="rounded-md w-full"
                  type="text"
                  name="language"
                  minLength={4}
                  maxLength={20}
                  placeholder="Python, Node.js, Deno, React, etc."
                />
              </div>
            </div>
            <div className="flex-grow flex md:flex-col lg:flex-row">
              <button
                type="submit"
                className="ml-auto mt-4 p-4 font-bold h-11 xs:w-full md:w-1/2 lg:w-1/4 border shadow flex flex-row items-center justify-center rounded-md bg-light-blue-600 text-white"
              >
                Create Project
              </button>
            </div>
          </Form>
        </Formik>
      </Fragment>
    </ProjectLayout>
  );
};

export default withApollo(NewProject);
