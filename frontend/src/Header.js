// src/Header.js
import React from 'react';
import { Link } from 'react-router-dom';
import './Header.css'; // Import CSS file for header styling

const Header = () => {
  return (
    <header className="header">
      <nav className="nav">
        <Link to="/" className="nav-link">Home</Link>
        <Link to="/login" className="nav-link">Login/Signup</Link>
        <Link to="/about" className="nav-link">About Us</Link>
        <Link to="/contact" className="nav-link">Contact Us</Link>
      </nav>
    </header>
  );
};

export default Header;
