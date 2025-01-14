// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getMessaging, getToken, onMessage } from "firebase/messaging";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyC5HZMaSmfbwhl6EVF29lBj5lGQwdO29Ow",
  authDomain: "chat-app-141fc.firebaseapp.com",
  projectId: "chat-app-141fc",
  storageBucket: "chat-app-141fc.firebasestorage.app",
  messagingSenderId: "367066930311",
  appId: "1:367066930311:web:aae506a43aabd7cba6ac22",
  measurementId: "G-HP5FFLXD38"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const messaging = getMessaging(app);

export const requestForToken = () => {
  return getToken(messaging, { vapidKey: 'BGjeyVctKmEwdbZBAOHP2qwmaHcP5kjdJ7ubG0c4zqRYZSFjWA_bFemAE1DDcxw3RD55TuWYtC0HnNYgc0nZsIM'})
    .then((currentToken) => {
      if (currentToken) {
        console.log('current token for client: ', currentToken);
        //perform any other operations with the token
      } else {
        console.log("No registration token available, Request permission to generate on.");
      }
      })
      .catch((err) => {
        console.log('An error occurred while retrieving token. ', err);
      });
    };

export const onMessageListener = () =>
  new Promise((resolve) => {
    onMessage(messaging, (payload) => {
      resolve(payload);
    })
  })

export { auth };