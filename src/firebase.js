import firebase from "firebase/app";
import "firebase/database";

const firebaseConfig = {
    apiKey: process.env.REACT_APP_API_KEY,
    authDomain: process.env.REACT_APP_AUTH_DOMAIN,
    databaseURL: "https://ours-kaist-default-rtdb.asia-southeast1.firebasedatabase.app/", 
    projectId: "ours-kaist",
    storageBucket: process.env.REACT_APP_STORAGE_BUCKET,
    messagingSenderId: process.env.REACT_APP_MESSAGING_SENDER_ID,
    appId: process.env.REACT_APP_APP_ID,
};

// Firebase 초기화
firebase.initializeApp(firebaseConfig);

// Realtime Database와 service에 대한 reference 얻기
const database = firebase.database();
export {database};