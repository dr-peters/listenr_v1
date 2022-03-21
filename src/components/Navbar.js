import React from 'react';
import { Link } from 'react-router-dom';

export default function Navbar() {
  return (
    <div className="NavBar">
      <nav>
        <Link to="/home">Go Home</Link>
      </nav>
    </div>
  )
}
