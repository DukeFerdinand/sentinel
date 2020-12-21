import { useContext } from 'react';

import { ProjectStore } from '../../store/projects';

export const ProjectManagementBar: React.FC = () => {
  const { projects, project } = useContext(ProjectStore);
  return (
    <div className="h-14 grid grid-cols-3 border shadow-sm divide-x">
      <div className="flex items-center justify-between px-4 hover:bg-gray-100 cursor-pointer">
        {project?.name} <i className="material-icons">keyboard_arrow_down</i>
      </div>
      <div className="flex items-center justify-between px-4 hover:bg-gray-100 cursor-pointer">
        Environment Name <i className="material-icons">keyboard_arrow_down</i>
      </div>
      <div className="flex items-center justify-between px-4 hover:bg-gray-100 cursor-pointer">
        Time Selection <i className="material-icons">keyboard_arrow_down</i>
      </div>
    </div>
  );
};
