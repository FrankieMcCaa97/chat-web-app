importScripts('https://www.gstatic.com/firebasejs/9.6.10/firebase-app.js');
importScripts('https://www.gstatic.com/firebasejs/9.6.10/firebase-messaging.js');

firebase.initializeApp({
    apiKey: "AIzaSyC5HZMaSmfbwhl6EVF29lBj5lGQwdO29Ow",
    authDomain: "chat-app-141fc.firebaseapp.com",
    projectId: "chat-app-141fc",
    storageBucket: "chat-app-141fc.firebasestorage.app",
    messagingSenderId: "367066930311",
    appId: "1:367066930311:web:aae506a43aabd7cba6ac22",
    measurementId: "G-HP5FFLXD38"
});

const messaging = firebase.messaging();

messaging.onBackgroundMessage(function(payload) {
    console.log('Received background message ', payload);
    // Customize notification here
    const notificationTitle = 'Background Message Title';
    const notificationOptions = {
        body: 'Background Message body.',
        icon: '/firebase-logo.png'
    };

    self.registration.showNotification(notificationTitle, notificationOptions);
});
