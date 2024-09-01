// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries
import { getAuth } from "firebase/auth";
import { getFirestore  } from "firebase/firestore";
import { getStorage } from 'firebase/storage'; 
// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAzh_yHF9pl59WLL_Y7XXTrG9f-bWZT5Rg",
  authDomain: "lms-743cf.firebaseapp.com",
  projectId: "lms-743cf",
  storageBucket: "lms-743cf.appspot.com",
  messagingSenderId: "558031987383",
  appId: "1:558031987383:web:a4448f3285b9b35bdb2332"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

const auth = getAuth(app)

const db = getFirestore(app)

const storage = getStorage(app)
export {auth,db,storage}