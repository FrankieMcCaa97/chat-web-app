import React from 'react';

const Sidebar = ({ onSignOut, onProfileUpdate, onHome, isVisible }) => {
    return (
        <div className={`sidebar ${isVisible ? 'sidebar-visible' : ''}`}>
            <ul>
                <li onClick={onHome}>Home</li>
                <li onClick={onProfileUpdate}>Update Profile</li>
                <li onClick={onSignOut}>Sign Out</li>
            </ul>
        </div>
    );
};

export default Sidebar;
