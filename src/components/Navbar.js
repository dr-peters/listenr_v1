import React from 'react';
import { Link } from 'react-router-dom';
import Logout from './Logout';

export default function Navbar({ userName }) {
  return (
    <div className="NavBar">
      <nav className="NavBar">
        <a>Logged-in: {userName}</a>
        <Link to="/home">Go Home</Link>
        <Link to="/friends">Friends</Link>
        <Logout />
      </nav>
    </div>
  )
}
