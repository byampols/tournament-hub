import React from 'react';
import { Link } from 'react-router-dom';

import Auth from '../../utils/auth';
import logout from '../../utils/logout';

const Header = () => {
  const logout = event => {
    event.preventDefault();
    logout();
  }

  console.log(Auth.getProfile())


  return (
    <header className="hero">
        <Link to="/">
          <h1 className="app-title">Tournament Hub</h1>
        </Link>

        <nav>
          {Auth.loggedIn() ? (
            <>
              <Link to ="/profile">Me</Link>
              <a href='/' onClick={logout}> 
                Logout
              </a>
            </>
          ) : (
            <>
              <Link to="/login">Login</Link>
              <Link to="/signup">Signup</Link>
            </>
          )}

        </nav>
    </header>
  );
};

export default Header;
