import React, { createContext, Reducer, useReducer } from 'react';
import { Environment, Project, User } from '../@generated/graphql';
import { ProjectAction } from './actions';

export interface ProjectState {
  project?: Project;
  projects: Array<Project>;
  selectedEnv?: Environment;
  environments: Array<Environment>;
  dispatch: React.Dispatch<Action>;
}

// Coercion here vs typing to avoid adding optional values

type Action<T = unknown> = {
  type: ProjectAction;
  payload: T;
};

const initialState = {} as ProjectState;
initialState.projects = [];
initialState.environments = [];

export const ProjectStore = createContext<ProjectState>(initialState);

const { Provider } = ProjectStore;

export type StateProviderProps = Omit<ProjectState, 'dispatch'>;

export const ProjectStateProvider: React.FC = ({ children }) => {
  const [state, dispatch] = useReducer<Reducer<ProjectState, Action>>(
    (state, action) => {
      switch (action.type) {
        //========================================
        // Projects
        //========================================
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
        //========================================
        // Environments
        //========================================
        case ProjectAction.SET_AVAILABLE_ENVIRONMENTS:
          return {
            ...state,
            environments: (action as Action<Array<Environment>>).payload,
          };
        case ProjectAction.SELECT_ENVIRONMENT:
          return {
            ...state,
            selectedEnv: (action as Action<Environment>).payload,
          };
        default:
          console.info('[DEFAULT CASE TRIGGERED]');
          return state;
      }
    },
    initialState
  );

  return <Provider value={{ ...state, dispatch }}>{children}</Provider>;
};
