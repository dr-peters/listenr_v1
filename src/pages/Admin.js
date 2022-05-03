import { collection, deleteDoc, getDocs, getDoc, doc, updateDoc } from 'firebase/firestore'
import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import Navbar from '../components/Navbar';
import { db } from '../firebase'

export default function Admin() {

    // Admin page that allows admins to change permissions of other users and also delete other users.
    // Displays information to the DOM in tables like all other pages.

    const thisUserRef = doc(db, "users", localStorage.getItem("currUser"));
    const navigate = useNavigate();
    const usersCollectionRef = collection(db, "users");
    const [userDocs, setUserDocs] = useState([]);
    const [refresh, setRefresh] = useState("");

    // Function called when user clicks "Delete" button.
        // Makes user confirm before actual deletion.
        // Then makes a reference to every document and subcollection in the user's
        // root document, and deletes them in order.
    const deleting = async(user) => {
        if(window.confirm("Are you sure you want to delete this user?")) {
            try {
                const userDocRef = doc(db, "users", user);
                const favArtistRef = doc(db, "users", user, "favorites", "artists");
                const favGenreRef = doc(db, "users", user, "favorites", "genres");
                const favSongRef = doc(db, "users", user, "favorites", "songs");
                const friendsRef = doc(db, "users", user, "friendsList", "friends");
                const friendReqRef = doc(db, "users", user, "friendsList", "recRequests");
                const friendSentRef = doc(db, "users", user, "friendsList", "sentRequests");
                const songRecsRef = doc(db, "users", user, "friendsList", "songRecs");

                await deleteDoc(favArtistRef);
                await deleteDoc(favGenreRef);
                await deleteDoc(favSongRef);
                await deleteDoc(friendsRef);
                await deleteDoc(friendReqRef);
                await deleteDoc(friendSentRef);
                await deleteDoc(songRecsRef);
                await deleteDoc(userDocRef);

            } catch(error) {
                console.log(error);
            }

        }

    }


    // Function called when an admin changes the permissions of a user by clicking the "Change" button.
    // Reference is made to that user's document.
        // If the permissions are currently set to true, then they become false if clicked.
        // Otherwise, the permissions become true. 
    const changePerms = async(user) => {
        const userDocRef = doc(db, "users", user);
        const userData = (await getDoc(userDocRef)).data();
        const perms = (userData.adPerms ? false : true);
        await updateDoc(userDocRef, {
            "adPerms" : perms
        })
        setRefresh("Changed perms of " + userData.username + " to " + perms.toString());
    }


    // Makes sure that users have access to the admin page before being able to access it.
    // Once user is confirmed to be an admin, useEffect queries the database for every user document and stores it in a state variable.
    useEffect(() => {
        const checkPerms = async() => {
            const userData = (await getDoc(thisUserRef)).data();
            if(!userData.adPerms) {
                window.alert("You don't have permission to do that");
                navigate('/home');
            } 
        }

        console.log("calling useEffect");
        const getUsers = async() => {
            const users = await getDocs(usersCollectionRef);
            setUserDocs(users.docs);
        }

        getUsers();
        checkPerms();
    }, [refresh])


    // Displays all users and the necessary information to the DOM in a table like all other pages.
    // Includes the Delete and Change buttons
    return (
        <div>
            <Navbar />
            <h2>Administrator Page</h2>

            <div>
                <center>
                <h3>All Users</h3>
                    <table>
                        <thead>
                        <tr><th></th><th>Username</th><th>Admin</th><th></th></tr>
                        </thead>
                        <tbody>
                            {userDocs.map((thisUser) => {
                                return (
                                    <tr key={thisUser.id}>
                                        <td><button className='delete' onClick={() => {deleting(thisUser.id)}}>Delete</button></td>
                                        <td>{thisUser.data().username}</td>
                                        <td>{thisUser.data().adPerms.toString()}</td>
                                        <td><button onClick={() => {changePerms(thisUser.id)}}>Change</button></td>
                                    </tr>
                                )
                            })}
                        </tbody>
                    </table>
                </center>
            </div>
        </div>
    )
}
