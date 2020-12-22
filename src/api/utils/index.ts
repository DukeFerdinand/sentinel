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
