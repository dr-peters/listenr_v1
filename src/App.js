import { FirebaseError } from 'firebase/app';
import { useState, useEffect } from 'react';
import './App.css';
import { db } from './firebase.js';
import { collection, getDocs } from 'firebase/firestore';

function App() {
  const [users, setUsers] = useState([]);

  const usersRef = collection(db, "users")
  useEffect(() => {

    const getUsers = async() => {
      const data = await getDocs(usersRef)
      setUsers(data.docs.map((doc) => ({...doc.data(), username: doc.username})))
    }

    getUsers()
  }, [])

  return (
    <div className="App">
      <input />
      <button>Create User</button>
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
