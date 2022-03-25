import React, { useEffect, useState } from 'react'
import { db } from "../firebase.js"
import { doc, getDoc, updateDoc } from 'firebase/firestore';

export default function Home({ user }) {
  const [profile, setProfile] = useState({});
  const [bio, setBio] = useState("");
  const [refresh, setRefresh] = useState("");





  /************** EDIT PROFILE SECTION **************/
  // This section will contain multiple async functions to allow the user to edit any particular part of their public profile. 
  const updateBio = async(newBio) => {
    const userDocRef = doc(db, "users", localStorage.getItem("currUser"));
    const newField = { bio: newBio};
    await updateDoc(userDocRef, newField);
    setRefresh(newBio);
  }
  // const updateFavArtist = async() => {
  //   const userDocRef = doc(db, "users", localStorage.getItem("currUser"));
  // }

  

  useEffect(() => {
    const updateProfile = async() => {
      try {
        const userDocRef = doc(db, "users", localStorage.getItem("currUser"));
        const profileRef = await getDoc(userDocRef);
        const profileData = profileRef.data();
        setProfile(profileData);
        
      } catch (error) {
        console.log(error);
      }
    }

    updateProfile();
  }, [refresh]);

  return (
    <div className="HomePage">
      <h1>HOMEPAGE</h1>
      <h4>User ID: <i>{user.uid}</i></h4>
      <h4>Bio: <i>{profile?.bio}</i></h4>
      <input
        placeholder="Enter new bio"
        onChange={(event) => {
          setBio(event.target.value);
        }}
      />
      <button
        onClick={() => {
          updateBio(bio)
        }}
      >Change bio</button>
      <h4>Favorite Artists: <i></i></h4>
      <h4>Favorite Genres: <i></i></h4>
      <h4>Favorite Songs: <i></i></h4>
      <h4>User Type: <i>{profile.userType}</i></h4>
      <h4>Username: <i>{profile.username}</i></h4>
    </div>
    
  )
}