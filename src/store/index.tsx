import React, { createContext, Reducer, useReducer } from 'react';
import { User } from '../@generated/graphql';
import { UserAction } from './actions';

export interface AppState {
  user?: User;
  dispatch: React.Dispatch<Action>;
}

// Coercion here vs typing to avoid adding optional values
const initialState = {} as AppState;

type Action<T = unknown> = {
  type: UserAction;
  payload: T;
};

export const Store = createContext<AppState>(initialState);

const { Provider } = Store;

export type StateProviderProps = Omit<AppState, 'dispatch'>;

export const StateProvider: React.FC<StateProviderProps> = ({
  children,
  ...stateProps
}) => {
  const [state, dispatch] = useReducer<Reducer<AppState, Action>>(
    (state, action) => {
      switch (action.type) {
        case UserAction.SET_USER:
          // TODO: find out how to do this without type coercion
          return { ...state, user: (action as Action<User>).payload };
        default:
          return state;
      }
    },
    // Merge state props and initial state.
    // NOTE: If initial state has real data at some point in the future,
    // put the more important one SECOND
    { ...initialState, ...stateProps }
  );

  return <Provider value={{ ...state, dispatch }}>{children}</Provider>;
};
