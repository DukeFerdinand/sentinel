export const formatProjectName = (projectName: string): string => {
  return projectName.toLowerCase().replaceAll(' ', '-');
};

// users/<email>
export const userPath = (id: string): string => `users/${id}`;

// users/<id>/projects
export const projectsPath = (id: string): string => `${userPath(id)}/projects`;

// users/<id>/counts
export const countsPath = (id: string): string => `${userPath(id)}/counts`;

// users/<id>/projects/<project>
export const projectPath = (id: string, projectName: string): string =>
  `${projectsPath(id)}/${projectName}`;

// users/<id>/projects/<project>/environments
export const environmentsPath = (userId: string, projectName: string): string =>
  `${projectPath(userId, projectName)}/environments`;

// users/<id>/projects/<project>/environments/<env>
export const environmentPath = (
  userId: string,
  projectName: string,
  envName: string
): string => `${environmentsPath(userId, projectName)}/${envName}`;

/** users/\<id>/projects/\<project>/keys */
export const keysPath = (userId: string, projectName: string): string =>
  `${projectPath(userId, projectName)}/keys`;

// users/<id>/projects/<project>/keys/<id>
export const keyPath = (
  userId: string,
  projectName: string,
  keyId: string
): string => `${environmentsPath(userId, projectName)}/${keyId}`;
