import { useContext, useState } from 'react';
import { Project } from '../../@generated/graphql';
import { ProjectAction } from '../../store/actions';

import { ProjectStore } from '../../store/projects';

export const ProjectManagementBar: React.FC = () => {
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
  };

  return (
    <div className="h-14 grid grid-cols-3 border shadow-sm divide-x">
      <div
        role="button"
        tabIndex={0}
        onKeyDown={() =>
          setState({ ...state, projectsDropdown: !state.projectsDropdown })
        }
        onClick={() =>
          setState({ ...state, projectsDropdown: !state.projectsDropdown })
        }
        className="flex items-center justify-between relative px-4 hover:bg-gray-100 cursor-pointer"
      >
        {project?.name} <i className="material-icons">keyboard_arrow_down</i>
        {state.projectsDropdown && (
          <div className="absolute hover:bg-gray-100 shadow-sm border w-full right-0 left-0 bg-white top-full">
            {projects.map((p, i) => {
              return (
                <div
                  role="button"
                  tabIndex={0}
                  onKeyDown={() => selectProject(p)}
                  onClick={() => selectProject(p)}
                  key={`project-dropdown-item=${i}`}
                  className="flex flex-row items-center h-14 px-4 hover:bg-gray-100"
                >
                  {p.name}

                  <span className="ml-auto text-gray-400">Selected</span>
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
