import React, { useEffect, useState } from 'react'
import { db } from "../firebase.js"
import { doc, getDoc, updateDoc } from 'firebase/firestore';
import Navbar from '../components/Navbar';

export default function Home({ user }) {
  const [profile, setProfile] = useState({});
  const [bio, setBio] = useState("");
  const [artist, setArtist] = useState("");
  const [allArtists, setAllArtists] = useState({});
  const [genre, setGenre] = useState("");
  const [allGenres, setAllGenres] = useState({});
  const [song, setSong] = useState("");
  const [allSongs, setAllSongs] = useState({});
  const [bioTag, setBioTag] = useState(true);
  const [iTag1, setITag1] = useState(true);
  const [iTag2, setITag2] = useState(true);
  const [iTag3, setITag3] = useState(true);
  const [iTag4, setITag4] = useState(true);
  const [iTag5, setITag5] = useState(true);
  const [iTag6, setITag6] = useState(true);
  const [iTag7, setITag7] = useState(true);
  const [iTag8, setITag8] = useState(true);
  const [iTag9, setITag9] = useState(true);
  const [iTag10, setITag10] = useState(true);
  const [iTag11, setITag11] = useState(true);
  const [iTag12, setITag12] = useState(true);
  const [iTag13, setITag13] = useState(true);
  const [iTag14, setITag14] = useState(true);
  const [iTag15, setITag15] = useState(true);
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
  const updateFavGenre = async(rank, newGenre) => {
    const favGenreRef = doc(db, "users", localStorage.getItem("currUser"), "favorites", "genres");
    let newField = {};
    if(rank === 1) {
      newField = {fav1: newGenre};
    } else if(rank === 2) {
      newField = {fav2: newGenre};
    } else if(rank === 3) {
      newField = {fav3: newGenre};
    } else if(rank === 4) {
      newField = {fav4: newGenre};
    } else {
      newField = {fav5: newGenre};
    }
    await updateDoc(favGenreRef, newField);
    setRefresh(newGenre);
  }
  const updateFavSong = async(rank, newSong) => {
    const favSongRef = doc(db, "users", localStorage.getItem("currUser"), "favorites", "songs");
    let newField = {};
    if(rank === 1) {
      newField = {fav1: newSong};
    } else if(rank === 2) {
      newField = {fav2: newSong};
    } else if(rank === 3) {
      newField = {fav3: newSong};
    } else if(rank === 4) {
      newField = {fav4: newSong};
    } else {
      newField = {fav5: newSong};
    }
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

        const favGenreRef = doc(db, "users", localStorage.getItem("currUser"), "favorites", "genres");
        const genreRef = await getDoc(favGenreRef);
        const genreData = genreRef.data();
        setAllGenres(genreData);

        const favSongRef = doc(db, "users", localStorage.getItem("currUser"), "favorites", "songs");
        const songRef = await getDoc(favSongRef);
        const songData = songRef.data();
        setAllSongs(songData);

      } catch (error) {
        console.log(error);
      }
    }

    updateProfile();
  }, [refresh]);

  return (
    <div className="HomePage">
      <Navbar userName={profile.username}/>
      <h1>HOMEPAGE</h1>
      <h4>Bio: {bioTag ? (
        <i onClick={() => setBioTag(false)}>{profile?.bio}</i>
        ) : (
          <div>
            <input autoFocus 
            onChange={(event) => {
              setBio(event.target.value);
            }}
            type="text" />
            <button
            onClick={() => {
              setBioTag(true);
              updateBio(bio);
            }} 
            >Save</button>
          </div>
        )} <br/>
      </h4>


      <h4>Favorite Artists: </h4>
      {iTag1 ? (
        <i onClick={() => setITag1(false)}>#1 {allArtists?.fav1}</i>
        ) : (
          <div>
            <input autoFocus 
            onChange={(event) => {
              setArtist(event.target.value);
            }}
            type="text" />
            <button
            onClick={() => {
              setITag1(true);
              updateFavArtist(1, artist)
            }} 
            >Save</button>
          </div>
        )} <br/>

      {iTag2 ? (
        <i onClick={() => setITag2(false)}>#2 {allArtists?.fav2}</i>
        ) : (
          <div>
            <input autoFocus 
            onChange={(event) => {
              setArtist(event.target.value);
            }}
            type="text" />
            <button
            onClick={() => {
              setITag2(true);
              updateFavArtist(2, artist)
            }} 
            >Save</button>
          </div>
        )} <br/>
        
        {iTag3 ? (
        <i onClick={() => setITag3(false)}>#3 {allArtists?.fav3} </i>
        ) : (
          <div>
            <input autoFocus 
            onChange={(event) => {
              setArtist(event.target.value);
            }}
            type="text" />
            <button
            onClick={() => {
              setITag3(true);
              updateFavArtist(3, artist)
            }} 
            >Save</button>
          </div>
        )} <br/>

        {iTag4 ? (
        <i onClick={() => setITag4(false)}>#4 {allArtists?.fav4} </i>
        ) : (
          <div>
            <input autoFocus 
            onChange={(event) => {
              setArtist(event.target.value);
            }}
            type="text" />
            <button
            onClick={() => {
              setITag4(true);
              updateFavArtist(4, artist)
            }} 
            >Save</button>
          </div>
        )} <br/>

        {iTag5 ? (
        <i onClick={() => setITag5(false)}>#5 {allArtists?.fav5} </i>
        ) : (
          <div>
            <input autoFocus 
            onChange={(event) => {
              setArtist(event.target.value);
            }}
            type="text" />
            <button
            onClick={() => {
              setITag5(true);
              updateFavArtist(5, artist)
            }} 
            >Save</button>
          </div>
        )} <br/>



      <h4>Favorite Genres: </h4>
      {iTag6 ? (
        <i onClick={() => setITag6(false)}>#1 {allGenres?.fav1}</i>
        ) : (
          <div>
            <input autoFocus 
            onChange={(event) => {
              setGenre(event.target.value);
            }}
            type="text" />
            <button
            onClick={() => {
              setITag6(true);
              updateFavGenre(1, genre)
            }} 
            >Save</button>
          </div>
        )} <br/>

      {iTag7 ? (
        <i onClick={() => setITag7(false)}>#2 {allGenres?.fav2}</i>
        ) : (
          <div>
            <input autoFocus 
            onChange={(event) => {
              setGenre(event.target.value);
            }}
            type="text" />
            <button
            onClick={() => {
              setITag7(true);
              updateFavGenre(2, genre)
            }} 
            >Save</button>
          </div>
        )} <br/>
        
        {iTag8 ? (
        <i onClick={() => setITag8(false)}>#3 {allGenres?.fav3} </i>
        ) : (
          <div>
            <input autoFocus 
            onChange={(event) => {
              setGenre(event.target.value);
            }}
            type="text" />
            <button
            onClick={() => {
              setITag8(true);
              updateFavGenre(3, genre)
            }} 
            >Save</button>
          </div>
        )} <br/>

        {iTag9 ? (
        <i onClick={() => setITag9(false)}>#4 {allGenres?.fav4} </i>
        ) : (
          <div>
            <input autoFocus 
            onChange={(event) => {
              setGenre(event.target.value);
            }}
            type="text" />
            <button
            onClick={() => {
              setITag9(true);
              updateFavGenre(4, genre)
            }} 
            >Save</button>
          </div>
        )} <br/>

        {iTag10 ? (
        <i onClick={() => setITag10(false)}>#5 {allGenres?.fav5} </i>
        ) : (
          <div>
            <input autoFocus 
            onChange={(event) => {
              setGenre(event.target.value);
            }}
            type="text" />
            <button
            onClick={() => {
              setITag10(true);
              updateFavGenre(5, genre)
            }} 
            >Save</button>
          </div>
        )} <br/>



      <h4>Favorite Songs: <i></i></h4>
      {iTag11 ? (
        <i onClick={() => setITag11(false)}>#1 {allSongs?.fav1}</i>
        ) : (
          <div>
            <input autoFocus 
            onChange={(event) => {
              setSong(event.target.value);
            }}
            type="text" />
            <button
            onClick={() => {
              setITag11(true);
              updateFavSong(1, song)
            }} 
            >Save</button>
          </div>
        )} <br/>

      {iTag12 ? (
        <i onClick={() => setITag12(false)}>#2 {allSongs?.fav2}</i>
        ) : (
          <div>
            <input autoFocus 
            onChange={(event) => {
              setSong(event.target.value);
            }}
            type="text" />
            <button
            onClick={() => {
              setITag12(true);
              updateFavSong(2, song)
            }} 
            >Save</button>
          </div>
        )} <br/>
        
        {iTag13 ? (
        <i onClick={() => setITag13(false)}>#3 {allSongs?.fav3} </i>
        ) : (
          <div>
            <input autoFocus 
            onChange={(event) => {
              setSong(event.target.value);
            }}
            type="text" />
            <button
            onClick={() => {
              setITag13(true);
              updateFavSong(3, song)
            }} 
            >Save</button>
          </div>
        )} <br/>

        {iTag14 ? (
        <i onClick={() => setITag14(false)}>#4 {allSongs?.fav4} </i>
        ) : (
          <div>
            <input autoFocus 
            onChange={(event) => {
              setSong(event.target.value);
            }}
            type="text" />
            <button
            onClick={() => {
              setITag14(true);
              updateFavSong(4, song)
            }} 
            >Save</button>
          </div>
        )} <br/>

        {iTag15 ? (
        <i onClick={() => setITag15(false)}>#5 {allSongs?.fav5} </i>
        ) : (
          <div>
            <input autoFocus 
            onChange={(event) => {
              setSong(event.target.value);
            }}
            type="text" />
            <button
            onClick={() => {
              setITag15(true);
              updateFavSong(5, song)
            }} 
            >Save</button>
          </div>
        )} <br/>

      
      
    </div>
    
  )
}