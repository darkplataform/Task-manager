import { initializeApp } from "firebase/app"
import { getFirestore } from "firebase/firestore"

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAME6--HGsl5s41n6uAVvnRxgdzTD_VOhw",
  authDomain: "customerexperiencewatcher.firebaseapp.com",
  databaseURL: "https://customerexperiencewatcher.firebaseio.com",
  projectId: "customerexperiencewatcher",
  storageBucket: "customerexperiencewatcher.appspot.com",
  messagingSenderId: "986866537214",
  appId: "1:986866537214:web:63c78f3cc217628ef3cbaf",
  measurementId: "G-P5BXE0XSTL"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app)

export {db}