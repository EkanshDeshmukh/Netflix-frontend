// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCIOkCV6WzlTzy91R7I61dPqtPmydVY3A0",
  authDomain: "netflix-gpt-3b160.firebaseapp.com",
  projectId: "netflix-gpt-3b160",
  storageBucket: "netflix-gpt-3b160.appspot.com",
  messagingSenderId: "985240845059",
  appId: "1:985240845059:web:41ba260d0484ab80d68736",
  measurementId: "G-CQ82JJ7W78"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

export const auth = getAuth()