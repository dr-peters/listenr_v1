import React from 'react'
import { useEffect, useState } from 'react';
import { setDoc, doc, getDoc } from "firebase/firestore";
import { db } from "../firebase.js";
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

export default function SpotifyLogin() {
    const CLIENT_ID = "242ab02bf8e24cf18347d1f9c94a0b0d";
    const REDIRECT_URI = "http://localhost:3000"
    const AUTH_ENDPOINT = "https://accounts.spotify.com/authorize"
    const RESPONSE_TYPE = "token"
    const SCOPES = ["user-read-private", "user-read-email", "user-read-currently-playing"].join("%20")
    const [spotifyData, setSpotifyData] = useState({});
    const navigate = useNavigate();

    /************** SPOTIFY LOGIN SECTION **************/
    const handleSpotifyLogin = async() => {
        window.location = `${AUTH_ENDPOINT}?client_id=${CLIENT_ID}&redirect_uri=${REDIRECT_URI}&scope=${SCOPES}&response_type=${RESPONSE_TYPE}&show_dialog=true`
        
    }

    const getSpotifyParams = (hash) => {
        const stringAfterHash = hash.substring(1);
        const paramsInUrl = stringAfterHash.split("&");
        const paramsSplitUp = paramsInUrl.reduce((accumulater, currentValue) => {
            const [key, value] = currentValue.split("=");
            accumulater[key] = value;
            return accumulater;
        }, {});
        return paramsSplitUp;
    }

    const addSpotifyUser = async() => {
        const axiosInfo = await axios.get("https://api.spotify.com/v1/me", {
            headers: {
                Authorization: "Bearer " + localStorage.getItem("access_token"),
            }
        })

        setSpotifyData(axiosInfo.data)
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
            const { access_token, expires_in, token_type } = getSpotifyParams(window.location.hash);
            console.log({access_token})
            localStorage.setItem("access_token", access_token);
        }

        if(localStorage.getItem("access_token")) {
            console.log(localStorage.getItem("access_token"))

            addSpotifyUser()
        }

        
    }, [])


    return (
        <div className='spotifyLogin'>
            <button className='spotifyButton' onClick={handleSpotifyLogin}>Login With Spotify</button>
        </div>
    )
}