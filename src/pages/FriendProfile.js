import React from 'react'
import Navbar from '../components/Navbar'

export default function FriendProfile({ friendID }) {
  return (
    <div className="friendProfile">
        <Navbar />
        <p>Viewing friend {friendID}</p>
    </div>
  )
}
