import React from 'react';
import { Link, useNavigate } from 'react-router-dom';

const Header = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate('/login');
  };

  return (
    <header>
      <h1>My Railway Management System</h1>
      <nav>
        <ul>
          <li><Link to="/">Home</Link></li>
          <li><Link to="/availability">Trains</Link></li>
          <li><Link to="/users">Users</Link></li>
          <li><Link to="/add">Add-Trains</Link></li>
          <li><Link to="/update">Update-Trains</Link></li>
          <li><Link to="/login">Login</Link></li>
          {localStorage.getItem('token') ? (
            <li><button onClick={handleLogout}>Logout</button></li>
          ) : null}
        </ul>
      </nav>
    </header>
  );
};

export default Header;
