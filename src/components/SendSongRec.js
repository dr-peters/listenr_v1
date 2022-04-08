import { doc, getDoc, updateDoc } from 'firebase/firestore';
import { db } from '../firebase';
import React, { useEffect } from 'react'
import { useState } from 'react';

export default function SendSongRec({ thisFriend }) {
    const [songRec, setSongRec] = useState("");
    const [myRecs, setMyRecs] = useState({});
    const friendRef = doc(db, "users", thisFriend, "friendsList", "songRecs");
    const currUserRef = doc(db, "users", localStorage.getItem("currUser"), "friendsList", "songRecs")

    const sendSong = async() => {
        const newSongRec = {[thisFriend] : songRec}
        await updateDoc(friendRef, newSongRec)
        console.log("Sent song")
    }

    const getRecs = async() => {
        const data = await getDoc(currUserRef);
        setMyRecs(data.data());
    }

    useEffect(() => {
        getRecs()
    }, [])

    return (
        <div className="SongRecs">
            <h4>Recommendations</h4>
            {Object.entries(myRecs).map((rec) => {
                return (
                    <div key={rec[1]}>
                        <p>{rec[1]}</p>
                    </div>
                    
                )
            })}
            <input
                placeholder="Enter song & artist..."
                onChange={(event) => {
                    setSongRec(event.target.value);
                }}
            />
            <button onClick={() => {
                sendSong()
            }}>Send Song Rec</button>

            
        </div>
    )
}
