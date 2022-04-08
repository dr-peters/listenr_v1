import React from 'react'
import { auth } from '../firebase.js'
import { signOut } from 'firebase/auth';
import { useNavigate } from 'react-router-dom'

export default function Logout() {

    /************** LOGOUT SECTION **************/
    // Simple logout function that clears the local storage and updates the auth variable.
    const navigate = useNavigate();
    const logout = async () => {
        console.log("Signing out");
        await signOut(auth);
        if(localStorage.getItem("access_token")) {
            localStorage.clear();
        }
        
        localStorage.clear();
        navigate("/")
    }

  return (
    <div className="Logout">
        <button onClick={logout}>Logout</button>
    </div>
  )
}
