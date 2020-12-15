import React, { createContext, Reducer, useReducer } from 'react';
import { UserAction } from './actions';

export interface AppState {
  user?: User;
  dispatch: React.Dispatch<Action>;
}

export interface User {
  username: string;
}

// Coercion here vs typing to avoid adding optional values
const initialState = {} as AppState;

type Action<T = unknown> = {
  type: UserAction;
  payload: T;
};

export const Store = createContext<AppState>(initialState);

const { Provider } = Store;

export const StateProvider: React.FC = ({ children }) => {
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
    initialState
  );

  return <Provider value={{ ...state, dispatch }}>{children}</Provider>;
};
