import * as firebase from 'firebase';

const firebaseConfig = {
    apiKey: "AIzaSyATMgGe-8klQ_SZgy5qTXBm2dnplSGQDw0",
    authDomain: "cyberkart-d7379.firebaseapp.com",
    projectId: "cyberkart-d7379",
    storageBucket: "cyberkart-d7379.appspot.com",
    messagingSenderId: "979677956121",
    appId: "1:979677956121:web:27dab5dbb1af6ddb484288"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const auth = firebase.auth();
export const googleAuthProvider = new firebase.auth.googleAuthProvider();