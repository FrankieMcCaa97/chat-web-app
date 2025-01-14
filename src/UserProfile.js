import React, { useState, useEffect } from 'react';
import { getAuth, updateProfile } from 'firebase/auth';

const UserProfile = () => {
    const [displayName, setDisplayName] = useState('');
    const [photoURL, setPhotoURL] = useState('');
    const [message, setMessage] = useState('');

    useEffect(() => {
        const auth = getAuth();
        const currentUser = auth.currentUser;
        if (currentUser) {
            setDisplayName(currentUser.displayName || '');
            setPhotoURL(currentUser.photoURL || '');
        }
    }, []);

    const handleUpdateProfile = async () => {
        try {
            await updateProfile(getAuth().currentUser, {
                displayName: displayName,
                photoURL: photoURL
            });
            setMessage('Profile updated successfully!');
        } catch (error) {
            setMessage(`Error: ${error.message}`);
        }
    };

    return (
        <div className="profile-info">
            <h2>Update Profile</h2>
            <input
                type="text"
                value={displayName}
                onChange={(e) => setDisplayName(e.target.value)}
                placeholder="Display Name"
            />
            <input
                type="text"
                value={photoURL}
                onChange={(e) => setPhotoURL(e.target.value)}
                placeholder="Profile Picture URL"
            />
            <button onClick={handleUpdateProfile}>Update Profile</button>
            {message && <p>{message}</p>}
        </div>
    );
};

export default UserProfile;
