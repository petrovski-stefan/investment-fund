import { createContext, useContext } from 'react';
import { IAuthContext } from '../types/auth';

export const AuthContext = createContext<IAuthContext | undefined>(undefined);

export const useAuthContext = () => {
  const context = useContext(AuthContext);

  if (context === undefined) {
    throw new Error('Please use the context inside AuthContextProvider.');
  }

  return context;
};
