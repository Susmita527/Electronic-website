// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";

import {getAuth} from  "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyCJAJrK6WlKIEIVqilEfM_COEE8KHTbNFU",
  authDomain: "woo-ecommerce-830d8.firebaseapp.com",
  projectId: "woo-ecommerce-830d8",
  storageBucket: "woo-ecommerce-830d8.firebasestorage.app",
  messagingSenderId: "635050301625",
  appId: "1:635050301625:web:2c74d852e2162377d62368",
  measurementId: "G-PFWQQC9Y8E"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

const auth = getAuth(app);

export { auth };