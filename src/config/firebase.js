// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCEcelzZw1VA8Rttm24M45J34fcrfOh6Ac",
  authDomain: "vite-contact-ac0f8.firebaseapp.com",
  projectId: "vite-contact-ac0f8",
  storageBucket: "vite-contact-ac0f8.appspot.com",
  messagingSenderId: "655386786021",
  appId: "1:655386786021:web:6e8bbec86a364db8283c0c"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const db =getFirestore(app);