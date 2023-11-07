// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBn2b8SXbssSV-u8bWNSEjBNaojAIPDLbE",
  authDomain: "nhom-21-iot.firebaseapp.com",
  projectId: "nhom-21-iot",
  storageBucket: "nhom-21-iot.appspot.com",
  messagingSenderId: "699602686255",
  appId: "1:699602686255:web:767295a931f3eec6de11da"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const database = getFirestore(app);

export default database;