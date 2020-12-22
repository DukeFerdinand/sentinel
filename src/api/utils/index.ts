export const formatProjectName = (projectName: string): string => {
  return projectName.toLowerCase().replaceAll(' ', '-');
};

// users/<email>
export const userPath = (id: string): string => `users/${id}`;

// users/<id>/projects
export const projectsPath = (id: string): string => `${userPath(id)}/projects`;

// users/<id>/projectsCount
export const projectsCountPath = (id: string): string =>
  `${userPath(id)}/projectsCount`;

// users/<id>/projects/<project>
export const projectPath = (id: string, projectName: string): string =>
  `${projectsPath(id)}/${projectName}`;
