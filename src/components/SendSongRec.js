import React from 'react'
import { useState } from 'react';

export default function SendSongRec({ thisFriend }) {
    const [songRec, setSongRec] = useState("");

    return (
        <div>
            <input
                placeholder="Enter song & artist..."
                onChange={(event) => {
                    setSongRec(event.target.value);
                }}
            />
            <button></button>
        </div>
    )
}
