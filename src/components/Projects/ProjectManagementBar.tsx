import { useRouter } from 'next/dist/client/router';
import { useContext, useState } from 'react';
import { Project } from '../../@generated/graphql';
import { formatProjectName } from '../../api/utils';
import { ProjectAction } from '../../store/actions';

import { ProjectStore } from '../../store/projects';

export const ProjectManagementBar: React.FC = () => {
  const router = useRouter();
  const { projects, project, dispatch } = useContext(ProjectStore);
  const [state, setState] = useState({
    projectsDropdown: false,
    envDropdown: false,
    timeDropdown: false,
  });

  const selectProject = (project: Project): void => {
    dispatch({
      type: ProjectAction.SELECT_PROJECT,
      payload: project,
    });

    router.push(`/projects/issues/${formatProjectName(project.name)}`);
  };

  return (
    // 1/3 column
    <div className="h-14 grid grid-cols-3 border shadow-sm divide-x">
      {/* Dropdown container */}
      <div
        role="button"
        tabIndex={0}
        onKeyDown={(e) =>
          e.key === ' ' &&
          setState({ ...state, projectsDropdown: !state.projectsDropdown })
        }
        onClick={() =>
          setState({ ...state, projectsDropdown: !state.projectsDropdown })
        }
        className="flex items-center justify-between relative"
      >
        {/* Dropdown activator */}
        <div className="hover:bg-gray-100 cursor-pointer flex flex-row w-full h-full items-center justify-between px-4">
          {project?.name} <i className="material-icons">keyboard_arrow_down</i>
        </div>

        {/* Dropdown content */}
        {state.projectsDropdown && (
          <div className="absolute shadow-sm border w-full right-0 left-0 bg-white top-full">
            {projects.map((p, i) => {
              return (
                <div
                  role="button"
                  tabIndex={0}
                  onKeyDown={(e) => e.key === ' ' && selectProject(p)}
                  onClick={() => selectProject(p)}
                  key={`project-dropdown-item=${i}`}
                  className="flex flex-row items-center h-14 px-4 hover:bg-gray-100"
                >
                  {p.name}

                  <span className="ml-auto text-gray-400">
                    {p.id === project?.id && 'Selected'}
                  </span>
                </div>
              );
            })}
          </div>
        )}
      </div>
      <div
        role="button"
        tabIndex={0}
        onKeyDown={() =>
          setState({ ...state, envDropdown: !state.envDropdown })
        }
        onClick={() => setState({ ...state, envDropdown: !state.envDropdown })}
        className="flex items-center justify-between px-4 hover:bg-gray-100 cursor-pointer"
      >
        Environment Name <span className="text-gray-400">(coming soon)</span>
        <i className="material-icons">keyboard_arrow_down</i>
      </div>
      <div
        role="button"
        tabIndex={0}
        onKeyDown={() =>
          setState({ ...state, timeDropdown: !state.timeDropdown })
        }
        onClick={() =>
          setState({ ...state, timeDropdown: !state.timeDropdown })
        }
        className="flex items-center justify-between px-4 hover:bg-gray-100 cursor-pointer"
      >
        Time Selection <span className="text-gray-400">(coming soon)</span>
        <i className="material-icons">keyboard_arrow_down</i>
      </div>
    </div>
  );
};
