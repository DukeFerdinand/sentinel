import { ApiKey } from '../../@generated/graphql';

export interface ProjectApiKeysProps {
  keys?: ApiKey[];
  loading: boolean;
}

export const ProjectApiKeys: React.FC<ProjectApiKeysProps> = ({
  keys,
  loading,
}) => {
  return (
    <div className="flex flex-col pt-4">
      <h2 className="text-2xl mb-4">Active Keys</h2>
      {loading && (
        // Loading, render message or skeleton
        <div className="p-4 mb-4 border bg-gray-200 animate-pulse">
          <p>Loading keys</p>
        </div>
      )}

      {/* Not loading, check data */}
      {!loading && keys && keys.length > 0 ? (
        keys.map((key, i) => {
          return (
            <div
              key={`active-project-key-${i}`}
              className="w-full flex flex-row items-center mb-4 p-4 border rounded-md"
            >
              {key.name}{' '}
              <span className="mx-4 text-opacity-70 text-gray-400">
                {key.environment}
              </span>
              <button className="ml-auto rounded-md px-2 py-1 text-white bg-red-600 hover:bg-red-500">
                Revoke Token
              </button>
            </div>
          );
        })
      ) : (
        <div className="p-4 mb-4 border bg-gray-200">
          <p>No active keys, create one above</p>
        </div>
      )}
    </div>
  );
};
