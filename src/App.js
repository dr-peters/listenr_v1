// VERY IMPORTANT!!!
// MUST USE HOTSPOT WHEN CONNECTING TO DATABASE ON CAMPUS, OR PAGE WILL NOT RENDER WITH DATA FROM FIRESTORE

import './App.css';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from './pages/Login.js';
import Home from './pages/Home.js';
import { useState } from 'react';
import { auth } from "./firebase.js";
import {onAuthStateChanged} from "firebase/auth";
import Friends from './pages/Friends';
import FriendProfile from './pages/FriendProfile';

function App() {
  const [user, setUser] = useState({});
  const [viewFriend, setViewFriend] = useState("");

  onAuthStateChanged(auth, (currentUser) => {
    setUser(currentUser);
});

  return (
    <div className='App'>
      <Router>
        <Routes>
          <Route path="/" element={<Login user={user}/>} />
          <Route path="/home" element={<Home />} />
          <Route path="/friends" element={<Friends setViewFriend={setViewFriend}/>} />
          <Route path="friendProfile" element={<FriendProfile friendID={viewFriend}/>} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;