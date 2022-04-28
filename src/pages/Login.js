import React, { useState } from 'react';
import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from "firebase/auth";
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
                username: registerName,
                userType: "localUser"
            });

            await setDoc(doc(db, `users/${newUser.user.uid}/favorites`, "artists"), {1: "", 2: "", 3: "", 4: "", 5: ""});
            await setDoc(doc(db, `users/${newUser.user.uid}/favorites`, "genres"), {1: "", 2: "", 3: "", 4: "", 5: ""});
            await setDoc(doc(db, `users/${newUser.user.uid}/favorites`, "songs"), {1: "", 2: "", 3: "", 4: "", 5: ""});

            await setDoc(doc(db, `users/${newUser.user.uid}/friendsList`, "friends"), {});
            await setDoc(doc(db, `users/${newUser.user.uid}/friendsList`, "recRequests"), {});
            await setDoc(doc(db, `users/${newUser.user.uid}/friendsList`, "sentRequests"), {});
            await setDoc(doc(db, `users/${newUser.user.uid}/friendsList`, "songRecs"), {});
            
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





    





    return(
    <div>
        <div className="login">
            <h2>WELCOME TO LISTENR</h2>
            <h3>Sign Up</h3>
            <input className="input"
                placeholder="Email..."
                onChange={(event) => {
                    setRegisterEmail(event.target.value);
                }}
            />
            <input className="input"
                placeholder="Password..."
                type="password"
                onChange={(event) => {
                    setRegisterPass(event.target.value);
                }}
            />
            <input className="input"
                placeholder="Username..."
                onChange={(event) => {
                    setRegisterName(event.target.value);
                }}
            />

            <button className="buttons" onClick={register}>Register</button>
        </div>

        <div className="login">
            <h3>Already have an account? Login!</h3>
            <input className="input"
                placeholder="Email..."
                onChange={(event) => {
                    setLoginEmail(event.target.value);
                }}
            />
            <input className="input"
                placeholder="Password..."
                type="password"
                onChange={(event) => {
                    setLoginPass(event.target.value);
                }}
            />

            <button className="buttons" onClick={login}>Login</button>
        </div>
        
        <SpotifyLogin />
    </div>
    );
}