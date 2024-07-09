import { initializeApp } from "https://www.gstatic.com/firebasejs/9.10.0/firebase-app.js";
import { getAuth } from "https://www.gstatic.com/firebasejs/9.10.0/firebase-auth.js"
import { getFirestore } from "https://www.gstatic.com/firebasejs/9.10.0/firebase-firestore.js"

const firebaseConfig = {
    apiKey: "AIzaSyA3xTvT3ksGK_O2E0ZEqADOboYfuLiYFdA",
    authDomain: "proyecto1-ff4ba.firebaseapp.com",
    databaseURL: "https://proyecto1-ff4ba-default-rtdb.firebaseio.com",
    projectId: "proyecto1-ff4ba",
    storageBucket: "proyecto1-ff4ba.appspot.com",
    messagingSenderId: "244837871094",
    appId: "1:244837871094:web:c7f45a8170515041956bd7",
    measurementId: "G-MF0SRND8Z3"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const auth = getAuth(app)
export const db = getFirestore(app)