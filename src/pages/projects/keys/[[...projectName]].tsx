import { useContext, useEffect, useState } from 'react';
import { NextPage } from 'next';
import { useRouter } from 'next/dist/client/router';
import { useMutation, useQuery } from '@apollo/client';
import Link from 'next/link';
import gql from 'graphql-tag';

import { formatProjectName } from '../../../api/utils';
import { ProjectLayout } from '../../../components/Projects/ProjectLayout';
import { withApollo } from '../../../lib/apollo';
import { ProjectStore } from '../../../store/projects';
import { ApiKey, MutationAddApiKeyArgs } from '../../../@generated/graphql';
import { authClient } from '../../../lib/apolloClient';
import { ModalPortal } from '../../../components/Common/Modal';
import { ProjectApiKeys } from '../../../components/Projects/ProjectApiKeys';
import { NewApiKeyForm } from '../../../components/Forms/NewApiKeyForm';

// MUTATIONS

const ADD_KEY_MUTATION = gql`
  mutation AddKey($config: ApiKeyInput) {
    addApiKey(config: $config) {
      id
      name
      token
      environment
    }
  }
`;

// QUERIES

const API_KEYS_QUERY = gql`
  query ActiveKeys($projectId: ID!) {
    activeKeys(projectId: $projectId) {
      id
      name
      environment
      # token
    }
  }
`;

const KeyManagementContent: NextPage = () => {
  const router = useRouter();
  const { projects, project } = useContext(ProjectStore);
  const [tokenModalOpen, setTokenModal] = useState(false);
  const [oneTimeApiToken, setToken] = useState<string | null>(null);

  // Queries
  const { data: keysData, loading: keysQueryLoading, error } = useQuery<{
    activeKeys: ApiKey[];
  }>(API_KEYS_QUERY, {
    client: authClient,
    // Skipping both prevents a 400, and enables refetching when the project var is ready
    skip: !project,
    variables: {
      projectId: project?.id,
    },
  });

  // Mutations
  const [addKey] = useMutation<{ addApiKey: ApiKey }>(ADD_KEY_MUTATION, {
    client: authClient,
    refetchQueries: [
      {
        query: API_KEYS_QUERY,
        variables: {
          projectId: project?.id,
        },
      },
    ],
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
          <NewApiKeyForm
            submit={async (values) => {
              const config: MutationAddApiKeyArgs['config'] = {
                name: values.keyName,
                environment: values.environment,
                project: project.id,
              };

              const result = await addKey({
                variables: {
                  config,
                },
              });

              const data = result.data?.addApiKey;

              if (data) {
                setToken(data.token);
                setTokenModal(true);
              }

              return true;
            }}
          />

          {/* single display token modal */}
          {tokenModalOpen && (
            <ModalPortal>
              <div className="flex flex-row w-screen h-screen bg-opacity-60 absolute top-0 bg-gray-600">
                <div className="w-1/2 m-auto bg-white rounded border shadow-sm">
                  <div className="flex p-4 w-full items-center">
                    <h1 className="text-xl">
                      Your new API token{' '}
                      <span role="img" aria-label="party popper">
                        🎉
                      </span>
                    </h1>

                    <button
                      tabIndex={0}
                      onClick={() => {
                        setTokenModal(false);
                        setToken(null);
                      }}
                      className="material-icons ml-auto px-1 rounded text-base hover:bg-gray-100"
                    >
                      close
                    </button>
                  </div>
                  <code className="bg-gray-200 w-full block p-4 overflow-x-auto">
                    {oneTimeApiToken}
                  </code>
                  <p className="p-4 mt-4">
                    Make sure to copy this code NOW and store it securely, as it
                    will never be shown again. If you need a refresher on how to
                    use this code, check the{' '}
                    <Link href="/faq">
                      <a>FAQ</a>
                    </Link>
                    for more info
                  </p>
                </div>
              </div>
            </ModalPortal>
          )}

          {/* Render Keys */}
          <ProjectApiKeys
            loading={keysQueryLoading}
            keys={keysData?.activeKeys}
          />
        </div>
      )}
    </section>
  );
};

const KeyManagementPage: NextPage = () => {
  return (
    <ProjectLayout title="Sentinel Key Management" showManagementBar>
      <KeyManagementContent />
    </ProjectLayout>
  );
};

export default withApollo(KeyManagementPage);
