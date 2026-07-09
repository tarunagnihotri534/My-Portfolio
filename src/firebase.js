import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyCU0ROEnoHy4aBLrg1d9GsdZkiwfa2D5M0",
  authDomain: "tarun69-portfolio.firebaseapp.com",
  projectId: "tarun69-portfolio",
  storageBucket: "tarun69-portfolio.firebasestorage.app",
  messagingSenderId: "3062255573",
  appId: "1:3062255573:web:e884f46331d3843cedb75c",
};

const app = initializeApp(firebaseConfig);

export const db = getFirestore(app);
