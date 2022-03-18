import { useState } from "react";
import { createUserWithEmailAndPassword, onAuthStateChanged, signInWithEmailAndPassword, signOut } from "firebase/auth";
import { auth } from "../firebase.js";

function LoginFuncs() {

    const [registerEmail, setRegisterEmail] = useState("");
    const [registerPass, setRegisterPass] = useState("");
    const [loginEmail, setLoginEmail] = useState("");
    const [loginPass, setLoginPass] = useState("");
    const [user, setUser] = useState({})

    onAuthStateChanged(auth, (currentUser) => {
        setUser(currentUser);
    });

    const register = async () => {
        try {
            const user = await createUserWithEmailAndPassword(
                auth,
                registerEmail,
                registerPass
            );
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

export default LoginFuncs