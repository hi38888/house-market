import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyAZwItVc1F3mxHPGxYTwCe-4Fp9mMMA4_A",
  authDomain: "house-market-b5fb8.firebaseapp.com",
  projectId: "house-market-b5fb8",
  storageBucket: "house-market-b5fb8.appspot.com",
  messagingSenderId: "708539951663",
  appId: "1:708539951663:web:97a71d952b79c93be4f4da",
};

initializeApp(firebaseConfig);
export const db = getFirestore();
