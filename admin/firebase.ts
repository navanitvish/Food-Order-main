// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyA8H9H2m9WOec4rE-LjqAwvsiNsITDkpi4",
  authDomain: "food-web-app-85704.firebaseapp.com",
  projectId: "food-web-app-85704",
  storageBucket: "food-web-app-85704.appspot.com",
  messagingSenderId: "974236289618",
  appId: "1:974236289618:web:9f2ab6038a4e66990ded8b",
  measurementId: "G-6WMYXCGBHV",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const storage = getStorage(app);
