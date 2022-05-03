import React, { useEffect, useState } from 'react'
import { db } from '../firebase';
import { doc, getDoc, updateDoc } from 'firebase/firestore';
import { useNavigate } from 'react-router-dom';

export default function Edit() {

    // Allows user to update their profile. Turns the table rows into text fields that accept input.

    const userDocRef = doc(db, "users", localStorage.getItem("currUser"));
    const favArtistRef = doc(db, "users", localStorage.getItem("currUser"), "favorites", "artists");
    const favGenreRef = doc(db, "users", localStorage.getItem("currUser"), "favorites", "genres");
    const favSongRef = doc(db, "users", localStorage.getItem("currUser"), "favorites", "songs");
    const [profile, setProfile] = useState({});
    const [allArtists, setAllArtists] = useState({});
    const [allGenres, setAllGenres] = useState({});
    const [allSongs, setAllSongs] = useState({});
    const [bio, setBio] = useState("");
    const navigate = useNavigate();


    // Functions that update each respective table / section of the user's profile.
    const updateArtistState = async(thisKey, currEvent) => {
        let prevArtist = allArtists;
        prevArtist[thisKey] = currEvent;
        setAllArtists(prevArtist);
    }

    const updateGenreState = async(thisKey, currEvent) => {
        let prevGenre = allGenres;
        prevGenre[thisKey] = currEvent;
        setAllGenres(prevGenre);
    }

    const updateSongState = async(thisKey, currEvent) => {
        let prevSong = allSongs;
        prevSong[thisKey] = currEvent;
        setAllSongs(prevSong);
    }


    // Function called when user clicks the "Save" button.
    const updateProfile = async() => {

        await updateDoc(favArtistRef, allArtists);
        await updateDoc(favGenreRef, allGenres);
        await updateDoc(favSongRef, allSongs);
        await updateDoc(userDocRef, {
            "bio": bio
        });
        navigate('/home');
    }


    // Gets current information from user's profile to pre-fill text fields.
    useEffect(() => {
        const getProfile = async() => {
            try {
                const profileRef = await getDoc(userDocRef);
                const profileData = profileRef.data();
                setProfile(profileData);
                setBio(profileData?.bio);
                const artRef = await getDoc(favArtistRef);
                const artistData = artRef.data();
                setAllArtists(artistData);
                const genreRef = await getDoc(favGenreRef);
                const genreData = genreRef.data();
                setAllGenres(genreData);
                const songRef = await getDoc(favSongRef);
                const songData = songRef.data();
                setAllSongs(songData);

            } catch (error) {
                console.log(error);
            }
        }
        getProfile();
    });



    return (

        // Once again, same format as other pages. State variable is mapped through to display information in a table.
        // This time, the information is displayed in text fields that can be edited.
        <div>
            <div>
                <center>
                <h3>Update Artists</h3>
                    <table>
                        <thead>
                        <tr><th>Ranking</th><th>Artist</th></tr>
                        </thead>
                        <tbody>
                            {Object.entries(allArtists).map((fields) => {
                                return (
                                    <tr key={fields[0]}>
                                        <td>{fields[0]}</td>
                                        <td>
                                            <input className='editInput'
                                                placeholder={fields[1]}
                                                onChange={(event) => {
                                                    updateArtistState(fields[0], event.target.value);
                                                }}
                                            />
                                        </td>
                                    </tr>
                                )
                            })}
                        </tbody>
                    </table>
                </center>
            </div>




            <div>
                <center>
                <h3>Update Genres</h3>
                    <table>
                        <thead>
                        <tr><th>Ranking</th><th>Genre</th></tr>
                        </thead>
                        <tbody>
                            {Object.entries(allGenres).map((fields) => {
                                return (
                                    <tr key={fields[0]}>
                                        <td>{fields[0]}</td>
                                        <td>
                                            <input className='editInput'
                                                placeholder={fields[1]}
                                                onChange={(event) => {
                                                    updateGenreState(fields[0], event.target.value);
                                                }}
                                            />
                                        </td>
                                    </tr>
                                )
                            })}
                        </tbody>
                    </table>
                </center>
            </div>




            <div>
                <center>
                <h3>Edit Songs</h3>
                    <table>
                        <thead>
                        <tr><th>Ranking</th><th>Song</th></tr>
                        </thead>
                        <tbody>
                            {Object.entries(allSongs).map((fields) => {
                                return (
                                    <tr key={fields[0]}>
                                        <td>{fields[0]}</td>
                                        <td>
                                            <input className='editInput'
                                                placeholder={fields[1]}
                                                onChange={(event) => {
                                                    updateSongState(fields[0], event.target.value);
                                                }}
                                            />
                                        </td>
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
                        <textarea className="bioInput"
                            placeholder={profile?.bio}
                            onChange={(event) => {
                                event.preventDefault();
                                setBio(event.target.value);
                            }}
                        />
                    </div>
                </center>
            </div>

            <button className="buttons" onClick={updateProfile}>Save</button>
        </div>
    )
}