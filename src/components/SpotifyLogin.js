import React from 'react'
import { useEffect } from 'react';
import { setDoc, doc, getDoc } from "firebase/firestore";
import { db } from "../firebase.js";
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

export default function SpotifyLogin() {
    // Creates the variables needed to construct the login page URL for Spotify login / account creation.
    // Client ID is obtained from Listenr's project via the spotify developer dashboard.
    // Redirect URI is where we will be redirecting back to after the user logs in (Listenr)
    // Auth Endpoint is the page we will be navigating to in order to authorize the user's Spotify account.
    // Scopes are the 'permissions' that the user will give Listenr to do with their account information. There are separated by a %20 in the browser URL.
    const CLIENT_ID = "242ab02bf8e24cf18347d1f9c94a0b0d";
    const REDIRECT_URI = "https://test1seniorproject.firebaseapp.com/"
    const AUTH_ENDPOINT = "https://accounts.spotify.com/authorize"
    const RESPONSE_TYPE = "token"
    const SCOPES = ["user-read-private", "user-read-email", "user-read-currently-playing"].join("%20")
    const navigate = useNavigate();

    /************** SPOTIFY LOGIN SECTION **************/
    // Navigates user to the correct Spotify authorization URL based on the previously defined variables.
    const handleSpotifyLogin = async() => {
        window.location = `${AUTH_ENDPOINT}?client_id=${CLIENT_ID}&redirect_uri=${REDIRECT_URI}&scope=${SCOPES}&response_type=${RESPONSE_TYPE}&show_dialog=true`
        
    }

    // Called in useEffect hook if hash. Obtains necessary information (such as the token) from URL and returns that back to useEffect to store in localStorage.
    const getSpotifyParams = (hash) => {
        const stringAfterHash = hash.substring(1);
        const paramsInUrl = stringAfterHash.split("&");
        const tokenSplit = paramsInUrl.reduce((accumulater, currentValue) => {
            const [key, value] = currentValue.split("=");
            accumulater[key] = value;
            return accumulater;
        }, {});
        return tokenSplit;
    }

    // uses axios package to make an API call to the spotify /v1/me endpoint. 
        // Sends the access token as a parameter to determine which account the application is accessing.
    const addSpotifyUser = async() => {
        const axiosInfo = await axios.get("https://api.spotify.com/v1/me", {
            headers: {
                Authorization: "Bearer " + localStorage.getItem("access_token"),
            }
        })

        // Replaces the periods ('.') with '%_%' to prevent bugs in the JSON object structure of the Firestore database.
            // Then creates a user document with the edited spotify uid as the document id in the database.
        const spotifyID = axiosInfo.data.id.replace('.', '%_%')
        const docRef = doc(db, "users", spotifyID)
        const docSnap = await getDoc(docRef)
        if(!docSnap.exists()) {
            await setDoc(doc(db, "users", spotifyID), {
                adPerms: false,
                bio: "",
                username: axiosInfo.data.display_name,
                userType: "spotifyUser"
            });

            await setDoc(doc(db, `users/${spotifyID}/favorites`, "artists"), {1: "", 2: "", 3: "", 4: "", 5: ""});
            await setDoc(doc(db, `users/${spotifyID}/favorites`, "genres"), {1: "", 2: "", 3: "", 4: "", 5: ""});
            await setDoc(doc(db, `users/${spotifyID}/favorites`, "songs"), {1: "", 2: "", 3: "", 4: "", 5: ""});

            await setDoc(doc(db, `users/${spotifyID}/friendsList`, "friends"), {});
            await setDoc(doc(db, `users/${spotifyID}/friendsList`, "recRequests"), {});
            await setDoc(doc(db, `users/${spotifyID}/friendsList`, "sentRequests"), {});
            await setDoc(doc(db, `users/${spotifyID}/friendsList`, "songRecs"), {});
        }
        
        localStorage.setItem("currUser", spotifyID)
        navigate("/home");
    }




    useEffect(() => {
        if(window.location.hash) {
            const { access_token } = getSpotifyParams(window.location.hash);
            console.log({access_token})
            localStorage.setItem("access_token", access_token);
        }

        if(localStorage.getItem("access_token")) {
            console.log(localStorage.getItem("access_token"))

            addSpotifyUser()
        }

        
    })


    return (
        <div className='spotifyLogin'>
            <button className='spotifyButton' onClick={handleSpotifyLogin}>Login With Spotify</button>
        </div>
    )
}