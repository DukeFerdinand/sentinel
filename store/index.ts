import { GlobalConfig } from '@dukeferdinand/ts-utils/dist/fetch';
import React from 'react';

interface AppState {
  fetchConfig?: GlobalConfig;
}

export const Context = React.createContext<AppState>({});
