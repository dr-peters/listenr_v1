// VERY IMPORTANT!!!
// MUST USE HOTSPOT WHEN CONNECTING TO DATABASE ON CAMPUS, OR PAGE WILL NOT RENDER WITH DATA FROM FIRESTORE

import './App.css';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from './pages/Login.js';
import Home from './pages/Home.js';
import Navbar from './components/Navbar';
import { useState } from 'react';
import { auth } from "./firebase.js";
import {onAuthStateChanged} from "firebase/auth";

function App() {
  const [user, setUser] = useState({})

  onAuthStateChanged(auth, (currentUser) => {
    setUser(currentUser);
});

  return (
    <div className='App'>
      <Router>
        <Navbar />
        <Routes>
          <Route path="/" element={<Login user={user} setUser={setUser}/>} />
          <Route path="/home" element={<Home user={user}/>} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;