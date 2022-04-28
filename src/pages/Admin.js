import { collection, deleteDoc, getDocs, getDoc, doc, updateDoc } from 'firebase/firestore'
import React, { useEffect, useState } from 'react'
import Navbar from '../components/Navbar';
import { db } from '../firebase'

export default function Admin() {
    const usersCollectionRef = collection(db, "users");
    const [userDocs, setUserDocs] = useState([]);
    const [refresh, setRefresh] = useState("");

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

    const changePerms = async(user) => {
        const userDocRef = doc(db, "users", user);
        const userData = (await getDoc(userDocRef)).data();
        const perms = (userData.adPerms ? false : true);
        await updateDoc(userDocRef, {
            "adPerms" : perms
        })
        setRefresh("Changed perms of " + userData.username + " to " + perms.toString());
    }

    useEffect(() => {
        console.log("calling useEffect");
        const getUsers = async() => {
            const users = await getDocs(usersCollectionRef);
            setUserDocs(users.docs);
        }

        getUsers();
    }, [refresh])

    return (
        <div>
            <Navbar />
            Welcome to admin

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
