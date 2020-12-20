export const formatProjectName = (projectName: string): string => {
  return projectName.toLowerCase().replaceAll(' ', '-');
};

// users/<email>
export const userPath = (email: string): string => `users/${email}`;

// users/<email>/projects
export const projectsPath = (email: string): string =>
  `${userPath(email)}/projects`;

// users/<email>/projects/<project>
export const projectPath = (email: string, projectName: string): string =>
  `${projectsPath(email)}/${projectName}`;
