import React from 'react'
import { Link } from 'react-router-dom';
// import logo from '../../assets/logo.jpg';

const UserNavbar = () => {
  return (
    
  <nav className="navbar">
    <div className="navbar-left">
      <Link to="/">Home</Link>
      <Link to="/about">About Us</Link>
    </div>
    <div className="navbar-center">
      <img src={""} alt="Logo" className="navbar-logo" />
    </div>
    <div className="navbar-right">
      <Link to="/user/login">Login</Link>
      <Link to="/user/signup">Sign Up</Link>
    </div>
  </nav>

  )
}

export default UserNavbar
