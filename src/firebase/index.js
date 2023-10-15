import firebase from "firebase/compat/app";
import "firebase/compat/auth";
import "firebase/compat/firestore";
import "firebase/compat/storage";
import "firebase/compat/database";
// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCJgLRk-KWsjPH0XelxTCF7q7-DnlzWFus",
  authDomain: "chatappv2-c26e4.firebaseapp.com",
  projectId: "chatappv2-c26e4",
  storageBucket: "chatappv2-c26e4.appspot.com",
  messagingSenderId: "1005535796499",
  appId: "1:1005535796499:web:905c7c687d2fde69bd4ee6",
};
let app;
if (firebase.apps.length === 0) {
  app = firebase.initializeApp(firebaseConfig);
} else {
  app = firebase.app();
}
// Initialize Firebase
const auth = app.auth();
const db = app.firestore();
var database = app.database();
export { auth, db, database, firebase };
