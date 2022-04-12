// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider, signInWithPopup, signOut, deleteUser } from 'firebase/auth'

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyAFXKDW9vG1ByvuUWJUFSeWITe7JEBc-7c",
    authDomain: "comfy-sloth-4ef35.firebaseapp.com",
    projectId: "comfy-sloth-4ef35",
    storageBucket: "comfy-sloth-4ef35.appspot.com",
    messagingSenderId: "172102894458",
    appId: "1:172102894458:web:c2cce74012de02f38f8cc3"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
const provider = new GoogleAuthProvider();
export const signInWithGoogle = () => signInWithPopup(auth, provider);
export const signOutGoogle = () => {
    signOut(auth);
    const user = auth.currentUser;
    deleteUser(user).then(() => {
        // User deleted.
    }).catch((error) => {
        console.log(error.message)
    });
}
