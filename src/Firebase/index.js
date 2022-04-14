// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDQS6rEOjQEiUqGAfA_SpK52Uco1cXK4rc",
  authDomain: "todolist-6c54f.firebaseapp.com",
  databaseURL: "https://todolist-6c54f-default-rtdb.asia-southeast1.firebasedatabase.app",
  projectId: "todolist-6c54f",
  storageBucket: "todolist-6c54f.appspot.com",
  messagingSenderId: "672199521293",
  appId: "1:672199521293:web:b19e641cc541ee8988d144",
  measurementId: "G-Q9L88KS8SS",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

export const auth = getAuth(app);
