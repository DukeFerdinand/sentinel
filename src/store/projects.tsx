import React, { createContext, Reducer, useReducer } from 'react';
import { Project, User } from '../@generated/graphql';
import { ProjectAction } from './actions';

export interface ProjectState {
  project?: Project;
  projects: Array<Project>;
  dispatch: React.Dispatch<Action>;
}

// Coercion here vs typing to avoid adding optional values

type Action<T = unknown> = {
  type: ProjectAction;
  payload: T;
};

const initialState = {} as ProjectState;

export const ProjectStore = createContext<ProjectState>(initialState);

const { Provider } = ProjectStore;

export type StateProviderProps = Omit<ProjectState, 'dispatch'>;

export const ProjectStateProvider: React.FC<StateProviderProps> = ({
  children,
  ...stateProps
}) => {
  const [state, dispatch] = useReducer<Reducer<ProjectState, Action>>(
    (state, action) => {
      switch (action.type) {
        case ProjectAction.INIT_STATE: {
          return { ...state, ...(action as Action<ProjectState>).payload };
        }
        case ProjectAction.SELECT_PROJECT:
          return { ...state, project: (action as Action<Project>).payload };
        case ProjectAction.ADD_PROJECT:
          return {
            ...state,
            projects: [(action as Action<Project>).payload, ...state.projects],
            project: (action as Action<Project>).payload,
          };
        case ProjectAction.SET_AVAILABLE_PROJECTS:
          return {
            ...state,
            projects: (action as Action<Array<Project>>).payload,
          };
        default:
          return state;
      }
    },
    // Merge state props and initial state.
    // NOTE: If initial state has real data at some point in the future,
    // put the more important one SECOND
    { ...initialState, ...stateProps }
  );

  return (
    <Provider value={{ ...stateProps, ...state, dispatch }}>
      {children}
    </Provider>
  );
};
