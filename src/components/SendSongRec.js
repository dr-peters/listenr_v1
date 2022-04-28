import { doc, updateDoc } from 'firebase/firestore';
import { db } from '../firebase';
import { useState } from 'react';

export default function SendSongRec({ thisFriend, friendUsername, song }) {
    const friendRef = doc(db, "users", thisFriend, "friendsList", "songRecs");

    const sendSong = async() => {
        const newSongRec = {[thisFriend] : song}
        await updateDoc(friendRef, newSongRec)
    }

    return (
        <div className="SongRecs">
            <button onClick={() => {
                sendSong()
            }}>Send</button>
        </div>
    )
}
