import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";

const config = {
    apiKey: "AIzaSyATMgGe-8klQ_SZgy5qTXBm2dnplSGQDw0",
    authDomain: "cyberkart-d7379.firebaseapp.com",
    projectId: "cyberkart-d7379",
    storageBucket: "cyberkart-d7379.appspot.com",
    messagingSenderId: "979677956121",
    appId: "1:979677956121:web:27dab5dbb1af6ddb484288"
};

// initialize firebase app
const app = initializeApp(config);
 
// export
export const auth = getAuth(app);
 
export const googleAuthProvider = new GoogleAuthProvider();