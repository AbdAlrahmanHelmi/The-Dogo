import firebase from "firebase/app";
import "firebase/firestore";
import "firebase/auth";
import "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyCSqvBNcqjP6XR5dFT4ZuV1KNzZm_1E2Xo",
  authDomain: "thedogosite.firebaseapp.com",
  projectId: "thedogosite",
  storageBucket: "thedogosite.appspot.com",
  messagingSenderId: "971825214346",
  appId: "1:971825214346:web:7cd23ea46be4cbb21d0e73",
};

firebase.initializeApp(firebaseConfig);

const projectFirestore = firebase.firestore();

const projectAuth = firebase.auth();

const projectStorge = firebase.storage();

const timestamp = firebase.firestore.Timestamp;

export { projectFirestore, projectAuth, timestamp, projectStorge };
