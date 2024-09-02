import React from 'react';
import { Link } from 'react-router-dom';
import '../styles/Navbar.css';

function Navbar() {
  return (
    <nav className="navbar">
      <h1>EchoSocial</h1>
      <div>
        <Link to="/">Feed</Link>
        <Link to="/profile/username">Profile</Link>
        <Link to="/Login">Login - Register</Link>
      </div>
    </nav>
  );
}

export default Navbar;
