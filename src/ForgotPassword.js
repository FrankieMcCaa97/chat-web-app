import React, { useState } from 'react';
import { getAuth, sendPasswordResetEmail } from 'firebase/auth';
import Sidebar from './Sidebar';

const ForgotPassword = ({ isVisible, onSignOut, onProfileUpdate }) => {
    const [email, setEmail] = useState('');
    const [message, setMessage] = useState('');

    const handlePasswordReset = async () => {
        const auth = getAuth();
        try {
            await sendPasswordResetEmail(auth, email);
            setMessage('Password reset email sent!');
        } catch (error) {
            setMessage(`Error: ${error.message}`);
        }
    };

    return (
        <div className="forgot-password-page">
            <Sidebar onSignOut={onSignOut} onProfileUpdate={onProfileUpdate} isVisible={isVisible} />
            <div className="forgot-password-content">
                <h2>Forgot Password</h2>
                <input 
                    type="email" 
                    value={email} 
                    onChange={(e) => setEmail(e.target.value)} 
                    placeholder="Enter your email" 
                />
                <button onClick={handlePasswordReset}>Reset Password</button>
                {message && <p>{message}</p>}
            </div>
        </div>
    );
};

export default ForgotPassword;
