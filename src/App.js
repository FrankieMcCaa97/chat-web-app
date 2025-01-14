import React, { useEffect, useState } from 'react';
import './App.css';
import Auth from './Auth';
import UserProfile from './UserProfile';
import ForgotPassword from './ForgotPassword';
import Sidebar from './Sidebar';
import { getAuth, signOut } from 'firebase/auth';
import { requestForToken, onMessageListener } from './firebase';
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
// import { faBars } from '@fortawesome/free-solid-svg-icons';

function App() {
    const [user, setUser] = useState(null);
    const [messages, setMessages] = useState([]);
    const [input, setInput] = useState('');
    const [showForgotPassword, setShowForgotPassword] = useState(false);
    const [showProfileUpdate, setShowProfileUpdate] = useState(false);
    // const [isSidebarVisible, setIsSidebarVisible] = useState(false);
    const [notification, setNotification] = useState({ title: '', body: ''});

    useEffect(() => {
        requestForToken();

        onMessageListener().then(payload => {
            setNotification({ title: payload.notification.title, body: payload.notification.body });
            console.log(payload);
            //clear notifications after 5 seconds 
            setTimeout(() => {
                setNotification({ title: '', body: '' });
            }, 5000);
        }).catch(err => console.log('failed: ', err));
    }, []);

    const sendMessage = (e) => {
        e.preventDefault();
        setMessages([...messages, input]);
        setInput('');
    };

    const handleSignOut = () => {
        const auth = getAuth();
        signOut(auth).then(() => {
            setUser(null);
            setShowProfileUpdate(false);
        });
    };

    const handleProfileUpdate = () => {
        setShowProfileUpdate(true);
    };

    // const toggleSidebar = () => {
    //     setIsSidebarVisible(!isSidebarVisible);
    // };

    const handleHome = () => {
        setShowProfileUpdate(false);
        setShowForgotPassword(false);
    }

    return (
        <div className="App">
            <header className="App-header">
                {user && (
                    <div>
                        {/* <FontAwesomeIcon icon={faBars} className="hamburger-icon" onClick={toggleSidebar} /> */}
                        <h1>Chat App</h1>
                    </div>
                )}
                {!user && <h1>Chat App</h1>}
            </header>
            {notification.title && (
                <div className="notification">
                    <strong>{notification.title}</strong>
                    <p>{notification.body}</p>
                </div>
            )}
            {showForgotPassword ? (
                <ForgotPassword 
                    // isVisible={isSidebarVisible} 
                    onSignOut={handleSignOut} 
                    onProfileUpdate={handleProfileUpdate} 
                />
            ) : !user ? (
                <div>
                    <Auth onAuthChange={setUser} />
                    <p onClick={() => setShowForgotPassword(true)}>Forgot Password?</p>
                </div>
            ) : (
                <div className="main-content">
                    <Sidebar
                        onSignOut={handleSignOut}
                        onProfileUpdate={handleProfileUpdate}
                        onHome={handleHome}
                        // isVisible={isSidebarVisible}
                    />
                    {showProfileUpdate ? (
                        <UserProfile />
                    ) : (
                        <div>
                            <div className="chat-box">
                                {messages.map((message, index) => (
                                    <p key={index}>{message}</p>
                                ))}
                            </div>
                            <form className="chat-input" onSubmit={sendMessage}>
                                <input
                                    value={input}
                                    onChange={(e) => setInput(e.target.value)}
                                    placeholder="Type your message..."
                                />
                                <button type="submit">Send</button>
                            </form>
                        </div>
                    )}
                </div>
            )}
        </div>
    );
}

export default App;
