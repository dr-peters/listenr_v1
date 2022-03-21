import React, { useState } from 'react';
import { createUserWithEmailAndPassword, onAuthStateChanged, signInWithEmailAndPassword, signOut } from "firebase/auth";
import { setDoc, doc } from "firebase/firestore";
import { auth, db } from "../firebase.js";

export default function Login() {

    const [registerEmail, setRegisterEmail] = useState("");
    const [registerPass, setRegisterPass] = useState("");
    const [loginEmail, setLoginEmail] = useState("");
    const [loginPass, setLoginPass] = useState("");
    const [user, setUser] = useState({})

    // Updates the current user that is signed in (using auth)
    onAuthStateChanged(auth, (currentUser) => {
        setUser(currentUser);
    });

    // Creates a new user account using auth, then takes the auth UID and creates a document inside the users collection. The new document id is the same as
      // the auth UID. This document stores all the necessary fields for each user.

    const register = async () => {
        try {
            const newUser = await createUserWithEmailAndPassword(
                auth,
                registerEmail,
                registerPass
            );
            console.log(newUser.user.uid);

            await setDoc(doc(db, "users", newUser.user.uid), {
                adPerms: false,
                bio: "",
                currently: "",
                picURL: "",
                username: "",
                userType: "",
                friendCode: "",
                favorites: {
                    favSongs: [],
                    favArtists: [],
                    favGenres: []
                },
                friendsList: [

                ],
                songRecs: {
                    rec1: {
                        friend: "",
                        song: "",
                        artist: ""
                    }
                }
            });
            
        } catch (error) {
            console.log(error.message);
        }
        
    }

    const login = async () => {
        try {
            const user = await signInWithEmailAndPassword(
                auth,
                loginEmail,
                loginPass
            );
            console.log(user.user.uid);
        } catch (error) {
            console.log(error.message);
        }
    }

    const logout = async () => {
        await signOut(auth);
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

        <button onClick={logout}>Sign Out</button>
    </div>
    );
}