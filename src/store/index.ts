import { Nullable } from '@dukeferdinand/ts-utils';
import { GlobalConfig } from '@dukeferdinand/ts-utils/dist/fetch';
import React from 'react';

export interface AppState {
  fetchConfig?: GlobalConfig;
}

export interface User {
  username: string;
}

export const Context = React.createContext<AppState>({});

export const UserContext = React.createContext<{
  user?: User;
  setUser?: (u: User) => void;
}>({});
