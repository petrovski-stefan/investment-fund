import { PropsWithChildren, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuthContext } from '../../auth-context/use-auth-context';

type ProtectedRouteProps = PropsWithChildren & {
  isSuperuser?: boolean;
};

export const ProtectedRoute = ({ children, isSuperuser }: ProtectedRouteProps) => {
  const navigate = useNavigate();
  const { authData } = useAuthContext();

  useEffect(() => {
    if (authData.username === '' || authData.token === '') {
      navigate('/auth/login');
    }

    if (isSuperuser !== undefined && authData.isSuperuser !== isSuperuser) {
      navigate('/');
    }
  }, [authData.username, authData.token, authData.isSuperuser]);

  if (authData.username === '' || authData.token === '') {
    return null;
  }

  if (isSuperuser !== undefined && authData.isSuperuser !== isSuperuser) {
    return null;
  }

  return children;
};
