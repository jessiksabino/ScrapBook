import { initializeApp } from "firebase/app";
import {getFirestore} from 'firebase/firestore'
import { getStorage } from "firebase/storage";

export const firebaseConfig = {
  apiKey: "AIzaSyCflZug-wfox9jBzjI7Tj6zxLuRdeVX_oc",
  authDomain: "scrapbook-24ba5.firebaseapp.com",
  projectId: "scrapbook-24ba5",
  storageBucket: "scrapbook-24ba5.appspot.com",
  messagingSenderId: "15768088819",
  appId: "1:15768088819:web:fbbcfeec688f302ca24786"
};



export const firebaseApp = initializeApp(firebaseConfig);

const db = getFirestore(firebaseApp)
const storage = getStorage(firebaseApp)
export { db, storage };

/*
 apiKey:process.env.APIKEY,
  authDomain: process.env.AUTHDOMAIN as string,
  projectId: process.env.PROJECTID as string,
  storageBucket: process.env.STORAGEBUCKET as string,
  messagingSenderId: process.env.MESSAGINGSENDERID as string,
  appId: process.env.APPID as string,
*/