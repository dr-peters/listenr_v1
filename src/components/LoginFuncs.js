import { useState } from "react";
import {
    createUserWithEmailAndPassword,
    onAuthStateChanged,
    signInWithEmailAndPassword,
    signOut
} from "firebase/auth";
import {setDoc, doc} from "firebase/firestore";
import { auth, db } from "../firebase.js";



function LoginFuncs() {

    const [registerEmail, setRegisterEmail] = useState("");
    const [registerPass, setRegisterPass] = useState("");
    const [loginEmail, setLoginEmail] = useState("");
    const [loginPass, setLoginPass] = useState("");
    const [authUser, setAuthUser] = useState({});


    // Updates the current user that is signed in
    onAuthStateChanged(auth, (currentUser) => {
        setAuthUser(currentUser);
    });

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

        <h4>User Logged In: {authUser?.uid}</h4>

        <button onClick={logout}>Sign Out</button>
    </div>
    );
}

export default LoginFuncs