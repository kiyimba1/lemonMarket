export const environment = {
  firebase: {
    projectId: 'lemon-mart-28dfe',
    appId: '1:84877339646:web:e33ad9857aa0ad57a06eaf',
    storageBucket: 'lemon-mart-28dfe.appspot.com',
    apiKey: 'AIzaSyA5Bx87oLnPnvtDEZM1PvpglgIZ8YQXE9I',
    authDomain: 'lemon-mart-28dfe.firebaseapp.com',
    messagingSenderId: '84877339646',
    measurementId: 'G-9KYTBRY4W1',
  },
  production: true
};

// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyA5Bx87oLnPnvtDEZM1PvpglgIZ8YQXE9I",
  authDomain: "lemon-mart-28dfe.firebaseapp.com",
  projectId: "lemon-mart-28dfe",
  storageBucket: "lemon-mart-28dfe.appspot.com",
  messagingSenderId: "84877339646",
  appId: "1:84877339646:web:e33ad9857aa0ad57a06eaf",
  measurementId: "G-9KYTBRY4W1"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
