import React, { useState } from 'react';
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword } from "firebase/auth";
import { auth } from '../FirebaseConfig';
import { getFirestore, collection, doc, setDoc} from "firebase/firestore";

function EmailForm() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [isSignUp, setIsSignUp] = useState(true)

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {

            let userCredential;
            
            if (isSignUp) {

                const userCredential = await createUserWithEmailAndPassword(auth, email, password);
                const user = userCredential.user;
    
                const db = getFirestore();
    
                const account = {
                    useruid: user.uid,
                    email: user.email,
                    createdAt: new Date()
                }
    
                await setDoc(doc(collection(db,"accounts"), user.uid), account);
    
                console.log("Successful signup: ", user);
            } else {
                userCredential = await signInWithEmailAndPassword(auth, email, password);
                console.log("Successful sign in: ", userCredential.user);
            }
        } catch (error) {
            console.log("Unsuccessful: ", error.message)
        }
    }

    return (
        <div>
            <h2>{isSignUp ? "Create account" : "Sign in"}</h2>
            <form onSubmit={handleSubmit}>
                <label htmlFor="email">Email</label>
                <input
                    type="text"
                    id="email"
                    data-form-type="other"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                />
                <label htmlFor="password">Password</label>
                <input
                    type="password"
                    id="password"
                    data-form-type="other"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                />
                <button type="submit">{isSignUp ? "Create account" : "Sign in"}</button>
            </form>
            <button onClick={() => setIsSignUp(!isSignUp)} type="submit">{isSignUp ? "Sign in" : "No account yet? Sign up"}</button>

        </div>
    )
}

export default EmailForm;
