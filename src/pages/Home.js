import React, { useEffect, useState } from 'react'
import { db } from "../firebase.js"
import { doc, getDoc, updateDoc } from 'firebase/firestore';
import Friends from './Friends.js';

export default function Home({ user }) {
  const [profile, setProfile] = useState({});
  const [bio, setBio] = useState("");
  const [artist, setArtist] = useState("");
  const [allArtists, setAllArtists] = useState({});
  const [genre, setGenre] = useState("");
  const [allGenres, setAllGenres] = useState({});
  const [song, setSong] = useState("");
  const [allSongs, setAllSongs] = useState({});
  const [refresh, setRefresh] = useState("");





  /************** EDIT PROFILE SECTION **************/
  // This section will contain multiple async functions to allow the user to edit any particular part of their public profile. 
  const updateBio = async(newBio) => {
    const userDocRef = doc(db, "users", localStorage.getItem("currUser"));
    const newField = { bio: newBio};
    await updateDoc(userDocRef, newField);
    setRefresh(newBio);
  }
  const updateFavArtist = async(rank, newArtist) => {
    const favArtistRef = doc(db, "users", localStorage.getItem("currUser"), "favorites", "artists");
    let newField = {};
    if(rank === 1) {
      newField = {fav1: newArtist};
    } else if(rank === 2) {
      newField = {fav2: newArtist};
    } else if(rank === 3) {
      newField = {fav3: newArtist};
    } else if(rank === 4) {
      newField = {fav4: newArtist};
    } else {
      newField = {fav5: newArtist};
    }
    await updateDoc(favArtistRef, newField);
    setRefresh(newArtist);
  }
  const updateFavGenre = async(newGenre) => {
    const favGenreRef = doc(db, "users", localStorage.getItem("currUser"), "favorites", "genres");
    const newField = {fav1: newGenre};
    await updateDoc(favGenreRef, newField);
    setRefresh(newGenre);
  }
  const updateFavSong = async(newSong) => {
    const favSongRef = doc(db, "users", localStorage.getItem("currUser"), "favorites", "songs");
    const newField = {fav1: newSong};
    await updateDoc(favSongRef, newField);
    setRefresh(newSong);
  }

  

  useEffect(() => {
    const updateProfile = async() => {
      try {
        const userDocRef = doc(db, "users", localStorage.getItem("currUser"));
        const profileRef = await getDoc(userDocRef);
        const profileData = profileRef.data();
        setProfile(profileData);

        const favArtistRef = doc(db, "users", localStorage.getItem("currUser"), "favorites", "artists");
        const artRef = await getDoc(favArtistRef);
        const artistData = artRef.data();
        setAllArtists(artistData);

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
      <h4>Spotify Token: <i>{localStorage.getItem("token")}</i></h4>
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
      <h4>Favorite Artists: </h4>
        #1 <i>{allArtists?.fav1}</i><br/>
        #2 <i>{allArtists?.fav2}</i><br/>
        #3 <i>{allArtists?.fav3}</i><br/>
        #4 <i>{allArtists?.fav4}</i><br/>
        #5 <i>{allArtists?.fav5}</i><br/>
        
      <input
        placeholder="Enter new artist"
        onChange={(event) => {
          setArtist(event.target.value);
        }}
      />
      <button
        onClick={() => {
          updateFavArtist(1, artist)
        }}
      >Change Artist</button>
      <h4>Favorite Genres: <i></i></h4>
      <h4>Favorite Songs: <i></i></h4>
      <h4>User Type: <i>{profile.userType}</i></h4>
      <h4>Username: <i>{profile.username}</i></h4>
      <Friends />
    </div>
    
  )
}