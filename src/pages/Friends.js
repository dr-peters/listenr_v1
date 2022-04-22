import React, { useEffect, useState } from 'react'
import { db } from "../firebase.js"
import { collection, deleteField, doc, getDoc, getDocs, updateDoc } from 'firebase/firestore';
import SendSongRec from '../components/SendSongRec.js';
import Navbar from '../components/Navbar.js';
import { Link } from 'react-router-dom';

export default function Friends({ setViewFriend }) {
    const usersRef = collection(db, "users")
    const currFriendListRef = doc(db, "users", localStorage.getItem("currUser"), "friendsList", "friends");
    const currReqListRef = doc(db, "users", localStorage.getItem("currUser"), "friendsList", "recRequests");
    const currSentListRef = doc(db, "users", localStorage.getItem("currUser"), "friendsList", "sentRequests");
    const currRecUserRef = doc(db, "users", localStorage.getItem("currUser"), "friendsList", "songRecs")

    const [users, setUsers] = useState([]);
    const [friends, setFriends] = useState({});
    const [recRequests, setRecRequests] = useState({});
    const [sentRequests, setSentRequests] = useState({});
    const [desiredFriend, setDesiredFriend] = useState("");
    const [myRecs, setMyRecs] = useState({});
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
        await updateDoc(currReqListRef, {
            [requestedID] : deleteField()
        })

        const ignoredUserRef = doc(db, "users", requestedID, "friendsList", "sentRequests");
        await updateDoc(ignoredUserRef, {
            [localStorage.getItem("currUser")] : deleteField()
        })
        setRefresh(requestedID)
    }




    const getRecs = async() => {
        const data = await getDoc(currRecUserRef);
        setMyRecs(data.data());
    }


    useEffect(() => {
        console.log("Calling useEffect")
        const getFriends = async() => {
            const data = await getDoc(currFriendListRef);
            setFriends(data.data());
        };
        const getReqRequests = async() => {
            const data = await getDoc(currReqListRef);
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
        getReqRequests();
        getSentRequests();
        getUsers();
        getRecs();
    }, [refresh]);




    
    return (
        <div className='friendsList'>
            <Navbar />
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
            <h4>Friends</h4>
            {Object.entries(friends).map((friend) => {
                return (
                    <div key={friend[1]}>
                        <Link to="/friendProfile" onClick={setViewFriend(friend[0])}>{friend[1]}</Link>
                        <button onClick={() => {
                            removeFriend(friend[0])
                        }}>Remove</button>
                        
                        
                        <SendSongRec thisFriend={friend[0]} friendUsername={friend[1]}/>
                        
                    </div>
                    
                )
            })}

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

            <h4>Recommendations</h4>
            {Object.entries(myRecs).map((rec) => {
                return (
                    <div key={rec[1]}>
                        <p>{rec[1]}</p>
                    </div>
                    
                )
            })}
        </div>
    )
}
