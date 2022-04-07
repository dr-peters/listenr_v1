import React from 'react'
import { useEffect, useState } from 'react';
import { setDoc, doc, getDoc } from "firebase/firestore";
import { auth, db } from "../firebase.js";
import axios from 'axios';

export default function SpotifyLogin() {
    const CLIENT_ID = "242ab02bf8e24cf18347d1f9c94a0b0d";
    const REDIRECT_URI = "http://localhost:3000"
    const AUTH_ENDPOINT = "https://accounts.spotify.com/authorize"
    const RESPONSE_TYPE = "token"
    const SCOPES = ["user-read-private", "user-read-email", "user-read-currently-playing"].join("%20")
    const [spotifyData, setSpotifyData] = useState({});

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




    useEffect(() => {
        if(window.location.hash) {
            const { access_token, expires_in, token_type } = getSpotifyParams(window.location.hash);
            console.log({access_token})
            localStorage.setItem("access_token", access_token);
        }

        if(localStorage.getItem("access_token")) {
            console.log(localStorage.getItem("access_token"))
            axios.get("https://api.spotify.com/v1/me", {
                headers: {
                    Authorization: "Bearer " + localStorage.getItem("access_token"),
                }
            }).then((response) => {
                setSpotifyData(response.data)
                
            }).catch((error) => {
                console.log(error)
            });
        }

        
    }, [])


    return (
        <div className='spotifyLogin'>
            <button onClick={handleSpotifyLogin}>Login With Spotify</button>
            <div>Spotify Data: {spotifyData.display_name}</div>
        </div>
    )
}