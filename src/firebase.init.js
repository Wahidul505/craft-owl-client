import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
    apiKey: "AIzaSyB9HC_kh9-tpEicsAQQv0gfqGJ5HO7zgf0",
    authDomain: "craft-owl.firebaseapp.com",
    projectId: "craft-owl",
    storageBucket: "craft-owl.appspot.com",
    messagingSenderId: "497749691881",
    appId: "1:497749691881:web:c20448d953d6b2672c4f78"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

export default auth;
