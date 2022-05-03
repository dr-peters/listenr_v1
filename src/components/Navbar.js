import { doc, getDoc } from 'firebase/firestore';
import { db } from '../firebase';
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import Logout from './Logout';

export default function Navbar() {
  const thisUserRef = doc(db, "users", localStorage.getItem("currUser"));
  const [username, setUsername] = useState("");
  const [perms, setPerms] = useState(false);

  


  // Displays which user is logged in currently, and determines whether or not they have access to the admin page.
  useEffect(() => {
    const getName = async() => {
      const data = (await getDoc(thisUserRef)).data();
      setUsername(data.username);
      setPerms(data.adPerms);
    }
    getName()
  }, [thisUserRef]);


  // Provides basic navbar functionality
  return (
    <div className="NavBar">
      <nav className="NavBar">
        <a>Logged-in: {username}</a>
        <Link to="/home">Go Home</Link>
        <Link to="/friends">Friends</Link>
        {perms 
          ? <Link to="/admin">Admin</Link> 
          : <></>
        }
        
        <Logout />
      </nav>
    </div>
  )
}
