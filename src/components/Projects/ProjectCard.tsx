import Link from 'next/link';

import { Project } from '../../@generated/graphql';
import { formatProjectName } from '../../api/utils';
import { GeneratedSVG } from '../Common/GeneratedSVG';

export interface ProjectCardProps {
  project?: Project;
  // Render as skeleton card or not
  skeleton?: boolean;
}

export const ProjectCard: React.FC<ProjectCardProps> = ({
  project,
  skeleton,
}) => {
  return project && !skeleton ? (
    <div className="rounded-md border shadow-md xs:w-full sm:w-full md:w-full lg:w-1/2 xl:w-1/4 pb-4 m-2">
      <div className="flex flex-row items-center mb-4 pt-5 px-5">
        <GeneratedSVG
          className="mr-2 h-8 items-center justify-center"
          str={project.name}
          size={30}
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
    <div className="rounded-md border shadow-md bg-gray-200 h-80 xs:w-full sm:w-full md:w-full lg:w-1/2 xl:w-1/4 pb-4 m-2 animate-pulse">
      <div className="flex flex-row items-center mb-4 h-24 pt-5 px-5">
        <div className="text-2xl h-4" />
      </div>
      <div className="flex flex-col">
        <div className="flex flex-row items-center justify-between px-5">
          <span className="flex flex-row items-center">
            <i className="material-icons mr-2">code</i>
            <div className="h-2" />
          </span>

          <div className="flex divide-x">
            <div className="pr-2 h-6 mr-1 w-14 bg-gray-300" />
            <div className="pl-2 h-6 w-14 bg-gray-300" />
          </div>
        </div>
        <div className="bg-gray-400 my-4 h-28 flex items-center justify-center" />
      </div>
    </div>
  );
};
