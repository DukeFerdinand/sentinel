export const formatProjectName = (projectName: string): string => {
  return projectName.toLowerCase().replaceAll(' ', '-');
};

/**  ## users/\<email> */
export const userPath = (id: string): string => `users/${id}`;

/**  ## projects/\<id> */
export const projectsPath = (): string => `projects`;

/**  ## users/\<id>/counts */
export const countsPath = (id: string): string => `${userPath(id)}/counts`;

/**  ## projects/\<project> */
export const projectPath = (projectId: string): string =>
  `${projectsPath()}/${projectId}`;

/** ## projects/\<project>/environments  */
export const environmentsPath = (projectId: string): string =>
  `${projectPath(projectId)}/environments`;

/** ## projects/\<project>/environments/\<env> */
export const environmentPath = (projectId: string, envName: string): string =>
  `${environmentsPath(projectId)}/${envName}`;

/** ## projects/\<project>/keys */
export const keysPath = (projectId: string): string =>
  `${projectPath(projectId)}/keys`;

/** ## projects/\<project>/keys/\<id> */
export const keyPath = (projectId: string, keyId: string): string =>
  `${environmentsPath(projectId)}/${keyId}`;
