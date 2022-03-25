import React from 'react';
import { Link } from 'react-router-dom';

export default function Navbar() {
  return (
    <div className="NavBar">
      <nav>
        <Link to="/home">Go Home</Link>
        <Link to="/">Login Page</Link>
      </nav>
    </div>
  )
}
