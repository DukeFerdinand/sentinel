import Link from 'next/link';
import { Project } from '../../@generated/graphql';
import { formatProjectName } from '../../api/utils';

export interface ProjectCardProps {
  project?: Project;
  // Render as skeleton card or not
  skeleton?: boolean;
}

export const ProjectCard: React.FC<ProjectCardProps> = ({
  project,
  skeleton,
}) => {
  return project ? (
    <div className="rounded-md border shadow-md xs:w-full sm:w-1/2 lg:w-1/3 pb-4">
      <div className="flex flex-row items-center mb-4 pt-5 px-5">
        {/* TEMPORARY IMAGE */}
        <img
          alt={project.name}
          className="mr-2 h-8"
          src={`https://www.tinygraphs.com/labs/isogrids/hexa16/${project.name}?theme=frogideas&numcolors=4&size=50&fmt=svg`}
        />
        <h3 className="text-2xl">{project.name}</h3>

        <Link href={`/projects/issues/${formatProjectName(project.name)}`}>
          <a className="ml-auto  hover:text-blue-800">Open Issues</a>
        </Link>
      </div>
      <div className="flex flex-col">
        <div className="flex flex-row items-center justify-between px-5">
          <span className="flex flex-row items-center">
            <i className="material-icons mr-2">code</i>
            <p>{project?.language}</p>
          </span>

          <div className="flex divide-x">
            <p className="pr-2">0 errors</p>
            <p className="pl-2">0 logs</p>
          </div>
        </div>
        <div className="bg-gray-400 my-4 h-28 flex items-center justify-center">
          <p>{'< Issue metrics coming soon >'}</p>
        </div>
      </div>
    </div>
  ) : (
    <div>skeleton - {skeleton}</div>
  );
};
