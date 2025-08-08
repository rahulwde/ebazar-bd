// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCoAV86-GYI4nJslCJRe16pDpkWakwI92M",
  authDomain: "ebajar-7a48b.firebaseapp.com",
  projectId: "ebajar-7a48b",
  storageBucket: "ebajar-7a48b.firebasestorage.app",
  messagingSenderId: "197440433055",
  appId: "1:197440433055:web:4c88e690217dd22763ebaa"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
