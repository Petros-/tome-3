import React, {useEffect, useState} from 'react'
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { auth } from './FirebaseConfig';

function TopNav() {
    const [user, setUser]= useState(null);

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
            setUser(currentUser);
        });
        return () => unsubscribe();
    }, []);

    const handleSignOut = () => {
        auth.signOut()
        .then(() => {
            console.log('User signed out')
        })
        .catch((error) => {
            console.log('Error with signout: ', error.message)
        })
    }
  return (
    <div>
      <p>This is the top nav</p>
        {user ? (
            <div>
                <p>{user.email}</p>
                <button onClick={handleSignOut}>Sign out</button>
            </div>
        ) : (
            <p>Sign in</p>
        )}
    </div>
  );
}

export default TopNav
