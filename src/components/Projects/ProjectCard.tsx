import { Project } from '../../@generated/graphql';

export interface ProjectCardProps {
  project: Project;
}

export const ProjectCard: React.FC<ProjectCardProps> = ({ project }) => {
  return <div>{project.name}</div>;
};
