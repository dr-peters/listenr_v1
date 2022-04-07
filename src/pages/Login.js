import React, { useState } from 'react';
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut } from "firebase/auth";
import { setDoc, doc } from "firebase/firestore";
import { auth, db } from "../firebase.js";
import { useNavigate } from 'react-router-dom';
import SpotifyLogin from '../components/SpotifyLogin.js';

export default function Login({ user }) {
    let navigate = useNavigate();
    const [registerEmail, setRegisterEmail] = useState("");
    const [registerPass, setRegisterPass] = useState("");
    const [registerName, setRegisterName] = useState("");
    const [loginEmail, setLoginEmail] = useState("");
    const [loginPass, setLoginPass] = useState("");





    /************** CREATE ACCOUNT W/ EMAIL & PASSWORD SECTION **************/
    // Creates a new user account using auth, then takes the auth UID and creates a document inside the users collection. The new document ID is the same as
      // the auth UID. This document stores all the necessary fields for each user. Stores the UID in local storage to keep track of which user is signed in.
    const register = async () => {
        try {
            const newUser = await createUserWithEmailAndPassword(
                auth,
                registerEmail,
                registerPass
            );

            await setDoc(doc(db, "users", newUser.user.uid), {
                adPerms: false,
                bio: "",
                currently: "",
                picURL: "",
                username: registerName,
                userType: "localUser"
            });

            await setDoc(doc(db, `users/${newUser.user.uid}/favorites`, "artists"), {fav1: "", fav2: "", fav3: "", fav4: "", fav5: ""});
            await setDoc(doc(db, `users/${newUser.user.uid}/favorites`, "genres"), {fav1: "", fav2: "", fav3: "", fav4: "", fav5: ""});
            await setDoc(doc(db, `users/${newUser.user.uid}/favorites`, "songs"), {fav1: "", fav2: "", fav3: "", fav4: "", fav5: ""});

            await setDoc(doc(db, `users/${newUser.user.uid}/friendsList`, "friends"), {});
            await setDoc(doc(db, `users/${newUser.user.uid}/friendsList`, "recRequests"), {});
            await setDoc(doc(db, `users/${newUser.user.uid}/friendsList`, "sentRequests"), {});
            
            localStorage.setItem("currUser", newUser.user.uid)
            navigate("/home");
        
        } catch (error) {
            console.log(error.message);
        }
        
        
    }





    /************** LOGIN SECTION **************/
    // Similar to register function in that it takes the current Auth UID and assigns it to local storage to keep track of which user is logged in currently.
    const login = async () => {
        try {
            const user = await signInWithEmailAndPassword(
                auth,
                loginEmail,
                loginPass
            );

            localStorage.setItem("currUser", user.user.uid)
            navigate("/home");
            
        } catch (error) {
            console.log(error.message);
        }
    }





    /************** LOGOUT SECTION **************/
    // Simple logout function that clears the local storage and updates the auth variable.
    const logout = async () => {
        console.log("Signing out");
        await signOut(auth);
        if(localStorage.getItem("access_token")) {
            localStorage.clear();
            window.location = `https://accounts.spotify.com/logout`
        }
        
    }





    return(
    <div className="login">
        <div>
            <h3>Register Account</h3>
            <input 
                placeholder="Email..."
                onChange={(event) => {
                    setRegisterEmail(event.target.value);
                }}
            />
            <input
                placeholder="Password..."
                onChange={(event) => {
                    setRegisterPass(event.target.value);
                }}
            />
            <input
                placeholder="Username..."
                onChange={(event) => {
                    setRegisterName(event.target.value);
                }}
            />

            <button onClick={register}>Register</button>
        </div>

        <div>
            <h3>Login</h3>
            <input
                placeholder="Email..."
                onChange={(event) => {
                    setLoginEmail(event.target.value);
                }}
            />
            <input
                placeholder="Password..."
                onChange={(event) => {
                    setLoginPass(event.target.value);
                }}
            />

            <button onClick={login}>Login</button>
        </div>

        <h4>User Logged In: {user?.email}</h4>
        <h4>Profile UID is: {user?.uid}</h4>
        <h4>spotify token: </h4>
        <button onClick={logout}>Sign Out</button>
        <SpotifyLogin />
    </div>
    );
}