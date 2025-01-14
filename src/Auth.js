import React, { useState } from 'react';
import { getAuth, signInWithEmailAndPassword, createUserWithEmailAndPassword, signOut, onAuthStateChanged } from 'firebase/auth';
import { auth } from './firebase';

const Auth = ({ onAuthChange }) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [user, setUser] = useState(null);
    const [error, setError] = useState('');

    const handleSignUp = async () => {
        setError(''); //clear previous error messages
        try {
            const userCredential = await createUserWithEmailAndPassword(auth, email, password);
            setUser(userCredential.user);
            onAuthChange(userCredential.user);
        } catch (error) {
            // console.error('Error signing up:', error.message);
            setError(`Sign Up Error: ${error.message}`);
        }
    };

    const handleSignIn = async () => {
        setError(''); //clear previous error messages
        try {
            const userCredential = await signInWithEmailAndPassword(auth, email, password);
            setUser(userCredential.user);
            onAuthChange(userCredential.user);
        } catch (error) {
            // console.error('Error signing in:', error.message);
            setError(`Sign In Error: ${error.message}`);
        }
    };

    const handleSignOut = async () => {
        try {
            await signOut(auth);
            setUser(null);
            onAuthStateChanged(null);
        } catch (error) {
            setError(`Sign Out Error: ${error.message}`);
        }
    };

    return (
        <div>
            {user ? (
                <div>
                    <h2>Welcome, {user.email}</h2>
                    <button onClick={handleSignOut}>Sign Out</button>
                </div>
            ) : (
                <div className="Sign-up">
                    <h1>Sign Up or Login</h1>
                    <label for="email">Email:</label>
                    <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Email" />
                    <label for="password">Password:</label>
                    <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Password" />
                    <button onClick={handleSignUp}>Sign Up</button>
                    <button className="sign-in" onClick={handleSignIn}>Sign In</button>
                    {error && <p class="error" style={{color: 'red'}}>{error}</p>}
                </div>
            )}
        </div>
    );
};

export default Auth;
