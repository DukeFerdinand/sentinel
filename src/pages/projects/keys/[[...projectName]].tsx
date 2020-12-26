import { useContext, useEffect } from 'react';
import { NextPage } from 'next';
import { Field, Form, Formik } from 'formik';
import { useRouter } from 'next/dist/client/router';

import { formatProjectName } from '../../../api/utils';
import { ProjectLayout } from '../../../components/Projects/ProjectLayout';
import { withApollo } from '../../../lib/apollo';
import { ProjectStore } from '../../../store/projects';
import gql from 'graphql-tag';
import { useMutation } from '@apollo/client';
import {
  ApiKeyResponse,
  MutationAddApiKeyArgs,
} from '../../../@generated/graphql';
import { authClient } from '../../../lib/apolloClient';

const ADD_KEY_MUTATION = gql`
  mutation AddKey($config: ApiKeyInput) {
    addApiKey(config: $config) {
      storedInfo {
        id
        name
        project
        environment
      }
      key
    }
  }
`;

const KeyManagementContent: NextPage = () => {
  const router = useRouter();
  const { projects, project } = useContext(ProjectStore);
  const [addKey] = useMutation<ApiKeyResponse>(ADD_KEY_MUTATION, {
    client: authClient,
  });

  useEffect(() => {
    // TODO: Add setter for undefined project but a DEFINED query

    // Query name potentially undefined, so init with an empty array to accomplish the desired effect
    if (project && (router.query.projectName || [])[0] !== project.name) {
      router.push(`/projects/keys/${formatProjectName(project.name)}`);
    }
  }, [project, router]);

  return (
    <section>
      {!project ? (
        <div>{projects.map((p) => p.name)}</div>
      ) : (
        <div className="flex flex-col">
          <h2 className="text-2xl mb-4">Manage API keys for {project.name}</h2>
          <Formik
            initialValues={{
              keyName: '',
              environment: '',
            }}
            onSubmit={async (values, helpers) => {
              if (!values.keyName) {
                helpers.setFieldError('keyName', 'Key name required');
              }
              if (!values.environment) {
                helpers.setFieldError(
                  'environment',
                  'Environment name required'
                );
              }

              if (values.keyName && values.environment) {
                console.info('Ready to submit');
                const config: MutationAddApiKeyArgs['config'] = {
                  name: values.keyName,
                  environment: values.environment,
                  project: project.id,
                  projectName: (router.query.projectName as string[])[0],
                };
                const result = await addKey({
                  variables: {
                    config,
                  },
                });

                console.info(result);
              }
            }}
          >
            <Form className="border mb-4 p-4 w-full lg:w-1/2 flex flex-col rounded-md">
              <div className="flex flex-row w-full">
                <h3 className="text-xl">Generate a key</h3>

                <button className="rounded border ml-auto p-1 pl-2 flex items-center justify-center hover:bg-gray-100">
                  Add Key
                  <i className="material-icons text-lg ml-1">add</i>
                </button>
              </div>
              <div className="flex flex-row w-full items-center mb-4">
                <label htmlFor="keyName" className="mr-4">
                  Key Name
                </label>
                <Field
                  className="rounded-md"
                  type="text"
                  name="keyName"
                  placeholder="Key Name"
                />
              </div>
              <div className="flex flex-row w-full items-center">
                <label htmlFor="environment" className="mr-4">
                  Environment
                </label>
                <Field
                  className="rounded-md"
                  type="text"
                  name="environment"
                  placeholder="dev, staging, prod, etc."
                />
              </div>
            </Form>
          </Formik>
          {/* Render Keys */}
          <div className="flex flex-col pt-4">
            <h2 className="text-2xl mb-4">Active Keys</h2>
            <div className="p-4 mb-4 border bg-gray-200">
              <p>No active keys, create one above</p>
            </div>
            {/* {[0, 1, 2].map((k, i) => {
              return (
                <div
                  key={`active-project-key-${i}`}
                  className="w-full flex flex-row items-center mb-4 p-4 border rounded-md"
                >
                  Key - {k}
                  <button className="ml-auto rounded-md px-2 py-1 text-white bg-red-600 hover:bg-red-500">
                    Revoke Token
                  </button>
                </div>
              );
            })} */}
          </div>
        </div>
      )}
    </section>
  );
};

const KeyManagementPage: NextPage = () => {
  return (
    <ProjectLayout title="Sentinel Key Management" showManagementBar={false}>
      <KeyManagementContent />
    </ProjectLayout>
  );
};

export default withApollo(KeyManagementPage);
