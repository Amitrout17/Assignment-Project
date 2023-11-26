import React from "react";
import { Link } from "react-router-dom";
import "../Navbar/Navbar.css"

const Nav = () => {
  return (
    <div className="navbar">
      <div className="logo-container">
        <h2>LinkedIn</h2>
      </div>
      <div className="nav-links">
        <Link to="/">Home</Link>
        <Link to="/login">Login</Link>
        <Link to="/register">Register</Link>
        <Link to="/networks">Networks</Link>
        <Link to="/Notifications">Notifications</Link>
        <Link to="/chat">Chat</Link>
      </div>
    </div>
  );
};

export default Nav;
