// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyB00wAdZRx8KLRszywej_nw4zSnm63vZDE",
  authDomain: "test1seniorproject.firebaseapp.com",
  databaseURL: "https://test1seniorproject-default-rtdb.firebaseio.com",
  projectId: "test1seniorproject",
  storageBucket: "test1seniorproject.appspot.com",
  messagingSenderId: "273470080038",
  appId: "1:273470080038:web:57af0bbfb339c1051952e7",
  measurementId: "G-QJDHTJ21MG"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);