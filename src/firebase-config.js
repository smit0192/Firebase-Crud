import { initializeApp } from "firebase/app";
import { getFirestore } from "@firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyDMPJ3cY6MSt78BOEObi-R6qk7oR5UOqjM",
  authDomain: "react-http-9363b.firebaseapp.com",
  databaseURL: "https://react-http-9363b-default-rtdb.firebaseio.com",
  projectId: "react-http-9363b",
  storageBucket: "react-http-9363b.appspot.com",
  messagingSenderId: "110636064444",
  appId: "1:110636064444:web:b66badbedefecaf46dfab9",
};

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
