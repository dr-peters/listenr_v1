import React, { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom';
import { db } from "../firebase.js"
import { doc, getDoc } from 'firebase/firestore';
import Navbar from '../components/Navbar';

export default function Home({ user }) {
  const [profile, setProfile] = useState({});
  const [allArtists, setAllArtists] = useState({});
  const [allGenres, setAllGenres] = useState({});
  const [allSongs, setAllSongs] = useState({});
  const navigate = useNavigate();

  /************** EDIT PROFILE SECTION **************/
  // This section will contain multiple async functions to allow the user to edit any particular part of their public profile. 
  
  

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
  }, []);

  return (
    <div className="HomePage">
      <Navbar userName={profile.username}/>





      <div>
        <center>
          <h3>Top 5 Artists</h3>
          <table>
            <thead>
              <tr><th>Ranking</th><th>Artist</th></tr>
            </thead>
            <tbody>
              {Object.entries(allArtists).map((fields) => {
                return (
                  <tr key={fields[0]}>
                    <td>{fields[0]}</td>
                    <td>{fields[1]}</td>
                  </tr>
                )
              })}
            </tbody>
          </table>
        </center>
      </div>





      <div>
        <center>
          <h3>Top 5 Genres</h3>
          <table>
            <thead>
              <tr><th>Ranking</th><th>Genre</th></tr>
            </thead>
            <tbody>
              {Object.entries(allGenres).map((fields) => {
                return (
                  <tr key={fields[0]}>
                    <td>{fields[0]}</td>
                    <td>{fields[1]}</td>
                  </tr>
                )
              })}
                
            </tbody>
          </table>
        </center>
      </div>





      <div>
        <center>
          <h3>Top 5 Songs</h3>
          <table>
            <thead>
              <tr><th>Ranking</th><th>Song</th></tr>
            </thead>
            <tbody>
              {Object.entries(allSongs).map((fields) => {
                return (
                  <tr key={fields[0]}>
                    <td>{fields[0]}</td>
                    <td>{fields[1]}</td>
                  </tr>
                )
              })}
                
            </tbody>
          </table>
        </center>
      </div>




      
      <div>
        <center>
          <h3>Bio</h3>
          <div className='biography'>
            <h5>{profile?.bio}</h5>
          </div>
        </center>
      </div>

      <Link to="/edit">
        <button className="buttons">Edit Profile</button>
      </Link>
      
    </div>
    
  )
}