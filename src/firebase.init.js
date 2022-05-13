// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyBL0ZSx0HfYzTbaq5hSmRYTSM4NYxPI5zE",
  authDomain: "doctors-portal-4c4e1.firebaseapp.com",
  projectId: "doctors-portal-4c4e1",
  storageBucket: "doctors-portal-4c4e1.appspot.com",
  messagingSenderId: "929129311228",
  appId: "1:929129311228:web:d9f0bb4d65e727604d6079"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app)

export default auth;