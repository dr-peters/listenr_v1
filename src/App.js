// VERY IMPORTANT!!!
// MUST USE HOTSPOT WHEN CONNECTING TO DATABASE ON CAMPUS, OR PAGE WILL NOT RENDER WITH DATA FROM FIRESTORE

import { useState, useEffect } from 'react';
import './App.css';
import { db } from './firebase.js';
import { addDoc, collection, getDocs } from 'firebase/firestore';

function App() {
  const [newUser, setNewUser] = useState("");
  const [newType, setNewType] = useState("");
  const [users, setUsers] = useState([]);
  const usersRef = collection(db, "users")

  const createUser = async () => {
    await addDoc(usersRef, 
      {
        uname: newUser,
        userType: newType
      }
    )
  }

  useEffect(() => {
    const getUsers = async() => {
      const data = await getDocs(usersRef);
      setUsers(data.docs.map((doc) => ({...doc.data(), username: doc.username})))
    };

    getUsers();
  }, [])

  return (
    <div className="App">
      <input
        placeholder="username"
        onChange={(event) => {
          setNewUser(event.target.value);
        }}
      />
      <input
        placeholder="user type"
        onChange={(event) => {
          setNewType(event.target.value);
        }}
      />
      <button onClick={createUser}>Create User</button>
      {users.map((user) => {
        return (
          <div>
            { " " }
            <h1>Username: {user.uname}</h1>
            <h1>User type: {user.userType}</h1>
          </div> 
        )
      })}
    </div>
  );
}

export default App;
