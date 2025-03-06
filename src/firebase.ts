import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyDypnOEFaltnLEE2o-ebmWphiLmQsVpJCU",
  authDomain: "globetrotter-817af.firebaseapp.com",
  projectId: "globetrotter-817af",
  storageBucket: "globetrotter-817af.firebasestorage.app",
  messagingSenderId: "748803900399",
  appId: "1:748803900399:web:5452559018d5bb197cec1a",
  measurementId: "G-N8NF5NC0GF",
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
