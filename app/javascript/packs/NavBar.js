import React from "react";
import { Link } from "react-router-dom";
import logo from './logo.png';

export default function NavBar() {
  return <div className="nav-bar">
    <div className="logo">
      <Link to='/'>
        <img src={logo} alt="logo" />
      </Link>
    </div>
  </div>
}