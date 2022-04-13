import React, { useEffect, useState } from 'react'
import { db } from "../firebase.js"
import { collection, deleteField, doc, getDoc, getDocs, updateDoc } from 'firebase/firestore';
import SendSongRec from '../components/SendSongRec.js';

export default function Friends() {
    const usersRef = collection(db, "users")
    const currFriendListRef = doc(db, "users", localStorage.getItem("currUser"), "friendsList", "friends");
    const currRecListRef = doc(db, "users", localStorage.getItem("currUser"), "friendsList", "recRequests");
    const currSentListRef = doc(db, "users", localStorage.getItem("currUser"), "friendsList", "sentRequests");

    const [users, setUsers] = useState([]);
    const [friends, setFriends] = useState({});
    const [recRequests, setRecRequests] = useState({});
    const [sentRequests, setSentRequests] = useState({});
    const [desiredFriend, setDesiredFriend] = useState("");
    const [refresh, setRefresh] = useState("");





    const findFriend = async (friendUsername) => {
        let alreadyAdded = false;
        let alreadySent = false;

        Object.entries(friends).map((friend) => {
            if(friend[1] === friendUsername) {
                alreadyAdded = true;
            }
        })
        Object.entries(sentRequests).map((request) => {
            if(request[1] === friendUsername) {
                alreadySent = true;
            }
        })

        if(alreadyAdded === false && alreadySent === false) {
            users.map(async(user) => {
                if(user.username === friendUsername) {
                    const senderRef = doc(db, "users", localStorage.getItem("currUser"));
                    const senderData = await getDoc(senderRef);
                    const senderUsername = senderData.data().username;
                    
                    const receiverReqRef = doc(db, "users", user.id, "friendsList", "recRequests");
                    const userKey = user.id;
                    const newSentRequest = {[userKey] : user.username};
                    const newReceivedRequest = {[localStorage.getItem("currUser")] : senderUsername}

                    await updateDoc(currSentListRef, newSentRequest); // Person 1 (sender)
                    await updateDoc(receiverReqRef, newReceivedRequest); // Person 2 (receiver)
                    setRefresh(friendUsername);
                }
            });
        }
    }





    const addFriend = async(requestedID, requestedName) => {
        await updateDoc(currFriendListRef, {
            [requestedID] : requestedName
        })

        const currRef = doc(db, "users", localStorage.getItem("currUser"));
        const currData = await getDoc(currRef);
        const currUsername = currData.data().username;
        const otherFriendListRef = doc(db, "users", requestedID, "friendsList", "friends");
        await updateDoc(otherFriendListRef, {
            [localStorage.getItem("currUser")] : currUsername
        })

        ignore(requestedID)
    }






    const removeFriend = async(removeID) => {
        await updateDoc(currFriendListRef, {
            [removeID] : deleteField()
        })

        const removeUserRef = doc(db, "users", removeID, "friendsList", "friends");
        await updateDoc(removeUserRef, {
            [localStorage.getItem("currUser")] : deleteField()
        })
        setRefresh("deleted" + removeID)
    }





    const ignore = async(requestedID) => {
        console.log("Triggering ignore function with id: " + requestedID)
        await updateDoc(currRecListRef, {
            [requestedID] : deleteField()
        })

        const ignoredUserRef = doc(db, "users", requestedID, "friendsList", "sentRequests");
        await updateDoc(ignoredUserRef, {
            [localStorage.getItem("currUser")] : deleteField()
        })
        setRefresh(requestedID)
    }





    useEffect(() => {
        console.log("Calling useEffect")
        const getFriends = async() => {
            const data = await getDoc(currFriendListRef);
            setFriends(data.data());
        };
        const getRecRequests = async() => {
            const data = await getDoc(currRecListRef);
            setRecRequests(data.data());
        };
        const getSentRequests = async() => {
            const data = await getDoc(currSentListRef);
            setSentRequests(data.data());
        }
        const getUsers = async() => {
            const data = await getDocs(usersRef);
            setUsers(data.docs.map((doc) => ({...doc.data(), id: doc.id})));
        };

        getFriends();
        getRecRequests();
        getSentRequests();
        getUsers();
    }, [refresh]);




    
    return (
        <div className='friendsList'>
            <h4>Friends</h4>
            {Object.entries(friends).map((friend) => {
                return (
                    <div key={friend[1]}>
                        <p>{friend[1]}</p>
                        <button onClick={() => {
                            removeFriend(friend[0])
                        }}>Remove</button>
                        <SendSongRec thisFriend={friend[0]} />
                        
                    </div>
                    
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

            <h4>Friend Requests</h4>
            {Object.entries(recRequests).map((request) => {
                return (
                    <div key={request[0]}>
                        <p>{request[1]}</p>
                        <button onClick={() => {
                            addFriend(request[0], request[1])
                        }}>Accept</button>
                        <button onClick={() => {
                            ignore(request[0])
                        }}>Ignore</button>
                    </div>
                    

                )
            })}
        </div>
    )
}
