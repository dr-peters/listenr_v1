// VERY IMPORTANT!!!
// MUST USE HOTSPOT WHEN CONNECTING TO DATABASE ON CAMPUS, OR PAGE WILL NOT RENDER WITH DATA FROM FIRESTORE

import './App.css';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from './pages/Login.js';
import Home from './pages/Home.js';
import Navbar from './components/Navbar';

function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/home" element={<Home />} />
      </Routes>
    </Router>
  );
}

export default App;