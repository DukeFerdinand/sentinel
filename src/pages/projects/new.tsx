import { useMutation, useQuery } from '@apollo/client';
import { ErrorMessage, Field, Form, Formik, FormikErrors } from 'formik';
import gql from 'graphql-tag';
import { NextPage } from 'next';
import { useRouter } from 'next/dist/client/router';
import Link from 'next/link';
import { Fragment, useContext, useState } from 'react';
import { Count, Project, ProjectInput } from '../../@generated/graphql';
import { formatProjectName } from '../../api/utils';
import { ProjectLayout } from '../../components/Projects/ProjectLayout';
import { withApollo } from '../../lib/apollo';
import { authClient } from '../../lib/apolloClient';
import { Store } from '../../store';
import { ProjectAction } from '../../store/actions';
import { ProjectStore } from '../../store/projects';

const NEW_PROJECT = gql`
  mutation NewProject($projectData: ProjectInput!) {
    newProject(projectInfo: $projectData) {
      id
      name
      language
      createdBy
    }
  }
`;

const PROJECT_COUNT_QUERY = gql`
  query projectCountQuery {
    projectCount {
      type
      total
    }
  }
`;

interface ProjectForm {
  name: string;
  language: string;
}

interface NewProjectResponse {
  newProject: Project;
}

const quotaReached = (total: number, allowed = 6): boolean => {
  return total >= allowed;
};

const ProjectQuota: React.FC<{ total: number; allowed: number }> = ({
  total,
  allowed,
}) => {
  if (total + 1 >= allowed) {
    return (
      <p className="text-xl font-extralight flex flex-row items-center justify-center ml-auto">
        Project Quota: <span className="text-red-600 ml-2 mr-1"> {total} </span>{' '}
        / {allowed}
      </p>
    );
  }

  return (
    <p className="text-xl font-extralight flex flex-row items-center justify-center ml-auto">
      Project Quota: {total} / {allowed}
    </p>
  );
};

const NewProject: NextPage = () => {
  const router = useRouter();
  const { user } = useContext(Store);
  const { dispatch } = useContext(ProjectStore);
  const [loading, setLoading] = useState(false);
  const [createProject] = useMutation<NewProjectResponse>(NEW_PROJECT, {
    client: authClient,
  });

  const { data, error } = useQuery<{ projectCount: Count }>(
    PROJECT_COUNT_QUERY,
    {
      client: authClient,
    }
  );

  console.info('[ Counts ] =>', data, error);

  const initialFormValues: ProjectForm = {
    name: '',
    language: 'Node.js',
  };
  return (
    <ProjectLayout title="New Sentinel Project" showManagementBar={false}>
      {!data ? (
        <span>Checking Project Quota</span>
      ) : (
        <Fragment>
          <div className="flex flex-row mb-4">
            <h2 className="text-2xl">New Project</h2>
            <ProjectQuota total={data.projectCount.total || 0} allowed={6} />
          </div>
          {!quotaReached(data.projectCount.total, 6) ? (
            <Formik
              initialValues={initialFormValues}
              onSubmit={async (values, helpers) => {
                setLoading(true);
                if (user) {
                  const project: ProjectInput = {
                    createdBy: user.id,
                    name: values.name,
                    language: values.language,
                  };

                  try {
                    const data = await createProject({
                      variables: {
                        projectData: project,
                      },
                    });

                    if (data.data) {
                      dispatch({
                        type: ProjectAction.ADD_PROJECT,
                        payload: data.data.newProject,
                      });
                      router.push(
                        `/projects/issues/${formatProjectName(
                          data.data.newProject.name
                        )}`
                      );
                    }
                  } catch (e) {
                    console.error(e);
                    if (
                      e.message.includes(
                        'A project with that name already exists'
                      )
                    ) {
                      helpers.setFieldError(
                        'name',
                        'A project with that name already exists'
                      );
                    }
                  }
                }
                setLoading(false);
              }}
              validate={(values) => {
                const errors: FormikErrors<ProjectForm> = {};

                if (!values.name) {
                  errors.name = 'Project name required';
                } else if (values.name.length < 4 || values.name.length > 20) {
                  errors.name =
                    'Project name must be between 4 and 20 characters';
                }

                if (!values.language) {
                  errors.language =
                    'Project language required, but can be any string value';
                } else if (
                  values.language.length < 2 ||
                  values.language.length > 20
                ) {
                  errors.name =
                    'Project name must be between 2 and 20 characters';
                }

                return errors;
              }}
            >
              <Form className="flex flex-col">
                <div className="flex-grow flex md:flex-col lg:flex-row border rounded-md p-4 shadow-md mb-4">
                  <div className="md:w-full lg:w-1/2">
                    <h5 className="text-xl">Project Name</h5>
                    <p className="mb-4">
                      A unique (to your user) name to give your project.
                      Don&apos;t worry, this can be changed later if you decide
                      on a different name!
                    </p>
                  </div>
                  <div className="flex flex-col mx-auto items-center justify-center md:w-full lg:w-1/4">
                    <Field
                      className="rounded-md w-full"
                      type="text"
                      name="name"
                      minLength={4}
                      maxLength={20}
                      placeholder="Project Name"
                    />
                    <ErrorMessage
                      render={(errorMessage: string) => (
                        <p className="text-red-600 text-center">
                          {errorMessage}
                        </p>
                      )}
                      name="name"
                    />
                  </div>
                </div>
                <div className="flex-grow flex md:flex-col lg:flex-row border rounded-md p-4 shadow-md">
                  <div className="md:w-full lg:w-1/2">
                    <h5 className="text-xl">Project Language</h5>
                    <p className="mb-4">
                      The programming language (or framework) used in your
                      application. All projects will use HTTP(S) for now, but
                      this will be more useful once more libraries (Node.js,
                      Python, Go, etc.) are implemented. You <i>are</i> able to
                      change this later!
                    </p>
                  </div>
                  <div className="flex flex-col mx-auto items-center justify-center md:w-full lg:w-1/4">
                    <Field
                      className="rounded-md w-full"
                      type="text"
                      name="language"
                      minLength={2}
                      maxLength={20}
                      placeholder="Python, Node.js, Deno, React, etc."
                    />
                    <ErrorMessage
                      render={(errorMessage: string) => (
                        <p className="text-red-600 text-center">
                          {errorMessage}
                        </p>
                      )}
                      name="language"
                    />
                  </div>
                </div>
                <div className="flex-grow flex md:flex-col lg:flex-row">
                  <button
                    type="submit"
                    className="ml-auto mt-4 p-4 font-bold h-11 xs:w-full md:w-1/2 lg:w-1/4 border shadow flex flex-row items-center justify-center rounded-md bg-light-blue-600 text-white"
                  >
                    Create Project{' '}
                    {loading && (
                      <i className="mx-2 fas fa-circle-notch fa-spin" />
                    )}
                  </button>
                </div>
              </Form>
            </Formik>
          ) : (
            <div className="flex flex-col shadow-md p-4 rounded-md border items-center justify-center my-auto mx-auto w-1/2">
              <h1 className="text-xl mb-4">
                Oops! Your project quota has been reached
              </h1>
              <p className="mb-6">
                Because sentinel is more of a proof of concept/tool for my
                personal use than a fully supported application, non-owner
                accounts are limited to a project count of 6. This is mainly to
                keep costs down as hosting can get <i>expensive</i> for
                real-time and logging applications. After all, it's 99% read and
                write actions ;)
              </p>
              <p className="mb-6">
                If you need more projects, or a more supported product, I
                strongly recommend you check out{' '}
                <a
                  href="https://sentry.io"
                  className="text-blue-400 hover:text-blue-800"
                >
                  Sentry.io
                </a>
                , as that is the service that Sentinel is based on. If there is
                enough interest in a paid tier for Sentinel, I could look into
                it. However as Sentry has FAR more resources than just one dev,
                you might want to look into their free tier first :)
              </p>

              {/* TODO: Create FAQ */}
              <p className="mb-6">
                To view all features and limitations for non-owner accounts,
                please see the{' '}
                <Link href="/faq">
                  <a className="text-blue-400 hover:text-blue-800">FAQ</a>
                </Link>
              </p>
            </div>
          )}
        </Fragment>
      )}
    </ProjectLayout>
  );
};

export default withApollo(NewProject);
