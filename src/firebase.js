// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { getFirestore, doc, setDoc } from "firebase/firestore";
// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyC0jzR-YCpHSM8xUES0qoKqwHTWUgaAssY",
  authDomain: "financeflow-cd918.firebaseapp.com",
  projectId: "financeflow-cd918",
  storageBucket: "financeflow-cd918.appspot.com",
  messagingSenderId: "374508641511",
  appId: "1:374508641511:web:a3c76a33c2de5a8a87d642",
  measurementId: "G-BTFZ25J5MJ"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const auth = getAuth(app);
const provider = new GoogleAuthProvider();
export { db, auth, provider, doc, setDoc };
const analytics = getAnalytics(app);