import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useAuthContext } from '../../auth-context/use-auth-context';

const LINKS = [
  { name: 'Invest', path: '/', auth: true, superuser: false },
  { name: 'Investment History', path: '/investment-history', auth: true, superuser: false },
  { name: 'Dividend History', path: '/dividend-history', auth: true, superuser: false },
  { name: 'Login', path: '/auth/login', auth: false, superuser: false },
  { name: 'Register', path: '/auth/register', auth: false, superuser: false },
  { name: 'Distribute dividends', path: '/distribute-dividends', auth: true, superuser: true },
  { name: 'Logout', path: '/auth/logout', auth: true },
];

const APP_NAME = 'Investment Fund';

export const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { authData, logoutUserContext } = useAuthContext();
  const { pathname } = useLocation();

  const isLoggedIn = authData.username != '' && authData.token != '';

  const availableLinks = LINKS.filter((link) => link.auth === isLoggedIn).filter((link) => {
    if (link.superuser === undefined) {
      return true;
    }
    return link.superuser === authData.isSuperuser;
  });

  const linkElements = availableLinks.map((link) => {
    return (
      <li
        className="py-4 mx-4 flex justify-center items-center hover:border-b-2 md:hover:border-green-600 hover:border-white text-center"
        key={link.name}
      >
        {link.name !== 'Logout' ? (
          <Link
            to={link.path}
            className={`${pathname === link.path ? 'md:text-green-600 text-white font-bold' : ''} `}
            onClick={() => setIsMenuOpen(false)}
          >
            {link.name}
          </Link>
        ) : (
          <button onClick={logoutUserContext}>{link.name}</button>
        )}
      </li>
    );
  });

  const mobileMenu = (
    <div className="w-screen h-screen absolute bg-green-600">
      <div className="flex justify-between px-10 py-6">
        <p>Welcome back, {authData.username}</p>
        <button
          className="hover:text-white"
          onClick={() => setIsMenuOpen(false)}
        >
          X
        </button>
      </div>

      <div className="flex justify-center ">
        <ul>{linkElements}</ul>
      </div>
    </div>
  );

  return (
    <>
      {isMenuOpen && mobileMenu}
      <nav className="h-[10vh] flex justify-between px-10 py-4 border-b-2">
        <div className="text-green-600 text-lg md:text-2xl flex items-center text-center">
          {APP_NAME}
        </div>
        <div className="md:hidden">
          <button onClick={() => setIsMenuOpen(true)}>=</button>
        </div>
        {isLoggedIn && (
          <div className="hidden md:flex md:items-center text-center">
            Welcome back, {authData.username}
          </div>
        )}
        <ul className="md:flex md:justify-between hidden">{linkElements}</ul>
      </nav>
    </>
  );
};
