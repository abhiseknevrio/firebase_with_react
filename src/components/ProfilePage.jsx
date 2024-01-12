import React from 'react'
import { useFirebase } from '../context/firebase'

const ProfilePage = () => {

    const firebase = useFirebase()

    return (
        <div className="App">
            <h1>React with Firebase</h1>
            <h2>Hello {firebase.user.email}</h2>
            <button onClick={firebase.signOutHandler}>Sign Out</button>
        </div >
    )
}

export default ProfilePage