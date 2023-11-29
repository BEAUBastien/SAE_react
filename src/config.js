import { initializeApp } from "firebase/app";

const firebaseConfig = {
    apiKey: "AIzaSyB4-J3wScDQhKCUeVrY72e6U4SaUul_juk",
    authDomain: "roarrr-d9abe.firebaseapp.com",
    databaseURL: "https://roarrr-d9abe-default-rtdb.europe-west1.firebasedatabase.app",
    projectId: "roarrr-d9abe",
    storageBucket: "roarrr-d9abe.appspot.com",
    messagingSenderId: "349989041812",
    appId: "1:349989041812:web:5c0c801ad24096ac6fe681",
    measurementId: "G-P5Q969SCB5"
  };
  
const app = initializeApp(firebaseConfig);

export default firebaseConfig;