import React, { useState } from 'react';
import { Context, User, UserContext } from '../store';

// This is just a generic HOC for wrapping all context providers we could end up with
export const ContextProviders: React.FC = ({ children }) => {
  const [user, setUser] = useState<User>();

  function updateUser(u: User) {
    setUser(u);
  }

  return (
    <Context.Provider value={{}}>
      <UserContext.Provider value={{ user, setUser: updateUser }}>
        {children}
      </UserContext.Provider>
    </Context.Provider>
  );
};
