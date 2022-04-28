import React, { useState, useEffect } from 'react'
import { doc, getDoc } from 'firebase/firestore';
import { db } from '../firebase';
import Navbar from '../components/Navbar'

export default function FriendProfile({ friendID }) {
  const [profile, setProfile] = useState({});
  const [allArtists, setAllArtists] = useState({});
  const [allGenres, setAllGenres] = useState({});
  const [allSongs, setAllSongs] = useState({});

  useEffect(() => {
    const updateProfile = async() => {
      try {
        const userDocRef = doc(db, "users", friendID);
        const profileRef = await getDoc(userDocRef);
        const profileData = profileRef.data();
        setProfile(profileData);

        const favArtistRef = doc(db, "users", friendID, "favorites", "artists");
        const artRef = await getDoc(favArtistRef);
        const artistData = artRef.data();
        setAllArtists(artistData);

        const favGenreRef = doc(db, "users", friendID, "favorites", "genres");
        const genreRef = await getDoc(favGenreRef);
        const genreData = genreRef.data();
        setAllGenres(genreData);

        const favSongRef = doc(db, "users", friendID, "favorites", "songs");
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
    <div className="friendProfile">
        <Navbar />
        <h2>Viewing {profile?.username}'s Profile</h2>
        <div>
        <center>
          <h3>{profile?.username}'s Artists</h3>
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
          <h3>{profile?.username}'s Genres</h3>
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
          <h3>{profile?.username}'s Songs</h3>
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
          <h3>{profile?.username}'s Bio</h3>
          <div className='biography'>
            <h5>{profile?.bio}</h5>
          </div>
        </center>
      </div>
    </div>
  )
}
