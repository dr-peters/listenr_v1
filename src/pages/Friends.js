import React, { useEffect, useState } from 'react'
import { db } from "../firebase.js"
import { collection, doc, getDoc, getDocs, updateDoc } from 'firebase/firestore';

export default function Friends() {
    const usersRef = collection(db, "users")
    const friendsListRef = doc(db, "users", localStorage.getItem("currUser"), "friendsList", "friends");
    const requestListRef = doc(db, "users", localStorage.getItem("currUser"), "friendsList", "requests");
    const [users, setUsers] = useState([]);
    const [friends, setFriends] = useState({});
    const [requests, setRequests] = useState({});
    const [desiredFriend, setDesiredFriend] = useState("");

    const findFriend = async (friendUsername) => {
        let alreadyAdded = false;
        let alreadySent = false;

        Object.entries(friends).map((friend) => {
            if(friend[1] === friendUsername) {
                alreadyAdded = true;
            }
        })
        Object.entries(requests).map((request) => {
            if(request[0] === friendUsername) {
                alreadySent = true;
            }
        })

        if(alreadyAdded === false && alreadySent === false) {
            users.map(async(user) => {
                if(user.username === friendUsername) {
                    const senderRef = doc(db, "users", localStorage.getItem("currUser"));
                    const receiverRef = doc(db, "users", user.id, "friendsList", "requests");
                    const senderUsername = senderRef.username;

                    var key = senderRef.username;
                    var newSentRequest = {};
                    newSentRequest[key] = "sent";
                    
                    const newReceivedRequest = {[senderUsername] : localStorage.getItem("currUser")}

                    await updateDoc(requestListRef, newSentRequest);
                    await updateDoc(receiverRef, newReceivedRequest);
                    console.log("The person DOES exist");
                }
                else {
                    console.log("The person doesn't exist.");
                }
            });
        }
    }

    useEffect(() => {
        const getFriends = async() => {
            const data = await getDoc(friendsListRef);
            setFriends(data.data())
        };
        const getRequests = async() => {
            const data = await getDoc(requestListRef);
            setRequests(data.data())
        };
        const getUsers = async() => {
            const data = await getDocs(usersRef);
            setUsers(data.docs.map((doc) => ({...doc.data(), id: doc.id})))
        };

        getFriends();
        getRequests();
        getUsers();
    }, []);

    return (
        <div className='friendsList'>
            <h4>Friends</h4>
            {Object.entries(friends).map((friend) => {
                return (
                    <p key={friend[0]}>{friend[1]}</p>
                )
            })}
            <input
                placeholder="Enter friend's username..."
                onChange={(event) => {
                    setDesiredFriend(event.target.value);
                }}
            />
            <button
                onClick={() => {
                    findFriend(desiredFriend)
                }}
            >Send Friend Request</button>
        </div>
    )
}
