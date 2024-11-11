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

    if (authData.isSuperuser && isSuperuser === undefined) {
      navigate('/distribute-dividends');
    }
  }, [authData.username, authData.token, authData.isSuperuser, isSuperuser]);

  if (authData.username === '' || authData.token === '') {
    return null;
  }

  if (isSuperuser !== undefined && authData.isSuperuser !== isSuperuser) {
    return null;
  }

  if (authData.isSuperuser && isSuperuser === undefined) {
    return null;
  }

  return children;
};
