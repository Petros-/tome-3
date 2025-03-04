import React, { useState } from 'react';
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from '../FirebaseConfig';
import { getFirestore, collection, doc, setDoc} from "firebase/firestore";

function EmailForm() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
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
        } catch (error) {
            console.log("Unsuccessful: ", error.message)
        }
    }

    return (
        <div>
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
                <button type="submit">Create account</button>
            </form>

        </div>
    )
}

export default EmailForm;
