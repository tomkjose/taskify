import firebase from "firebase/compat/app";
import "firebase/compat/auth";
import "firebase/compat/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyC02VSmeFW0-TL-c7FO0WQVBjl87Qn0X7w",
  authDomain: "taskify-6ce46.firebaseapp.com",
  projectId: "taskify-6ce46",
  storageBucket: "taskify-6ce46.appspot.com",
  messagingSenderId: "450215165550",
  appId: "1:450215165550:web:1e68c268eb9aff6519b07f",
};

firebase.initializeApp(firebaseConfig);

export const auth = firebase.auth();
export default firebase;
