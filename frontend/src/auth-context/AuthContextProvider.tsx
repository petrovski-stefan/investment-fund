import { PropsWithChildren, useState } from 'react';
import { AuthContext } from './use-auth-context';
import { AuthData } from '../types/auth';

const getAuthContextInitialValue = () => {
  const authData = localStorage.getItem('authData');

  if (authData === null) {
    return { username: '', token: '', isSuperuser: false } as AuthData;
  }

  return JSON.parse(authData) as AuthData;
};

export const AuthContextProvider = ({ children }: PropsWithChildren) => {
  const [authData, setAuthData] = useState<AuthData>(getAuthContextInitialValue);

  const loginUserContext = (loginData: AuthData) => {
    setAuthData({ ...loginData });
    localStorage.setItem('authData', JSON.stringify(loginData));
  };

  const logoutUserContext = () => {
    setAuthData({ username: '', token: '', isSuperuser: false });
    localStorage.removeItem('authData');
  };

  const value = {
    authData,
    loginUserContext,
    logoutUserContext,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
