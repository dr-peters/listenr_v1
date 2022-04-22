import { doc, updateDoc } from 'firebase/firestore';
import { db } from '../firebase';
import { useState } from 'react';

export default function SendSongRec({ thisFriend, friendUsername }) {
    const [songRec, setSongRec] = useState("");
    const friendRef = doc(db, "users", thisFriend, "friendsList", "songRecs");

    const sendSong = async() => {
        const newSongRec = {[thisFriend] : songRec}
        await updateDoc(friendRef, newSongRec)
    }

    return (
        <div className="SongRecs">
            <input
                placeholder="Enter song & artist..."
                onChange={(event) => {
                    setSongRec(event.target.value + " - From " + friendUsername);
                }}
            />
            <button onClick={() => {
                sendSong()
            }}>Send Song Rec</button>

            
        </div>
    )
}
