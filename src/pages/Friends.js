import React, { useEffect, useState } from 'react'
import { db } from "../firebase.js"
import { collection, doc, getDoc, getDocs, updateDoc } from 'firebase/firestore';

export default function Friends() {
    const usersRef = collection(db, "users")
    const friendsListRef = collection(db, "users", localStorage.getItem("currUser"), "friendsList");
    const [users, setUsers] = useState({});
    const [friends, setFriends] = useState({});

    useEffect(() => {
        const getFriends = async() => {
            const data = await getDocs(friendsListRef);
            setFriends(data.docs.map((doc) => ({...doc.data(), id: doc.id})))
        };
    
        getFriends();
    }, []);

    return (
        <div className='friendsList'>
            <h4>Friends</h4>
            {friends.map((friend) => {
                return (
                    <i>{friend.friendUsername}</i>
                )
            })}
        </div>
    )
}
