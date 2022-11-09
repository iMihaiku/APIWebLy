import { initializeApp } from 'firebase/app';
import { getFirestore, addDoc, collection, getDoc, doc, getDocs } from "firebase/firestore"

const firebaseConfig = {
  apiKey: "AIzaSyAIrwDzO-cY0cGStv8N6iKlwYF-OH_vZiI",
  authDomain: "webly-df71c.firebaseapp.com",
  projectId: "webly-df71c",
  storageBucket: "webly-df71c.appspot.com",
  messagingSenderId: "676472557830",
  appId: "1:676472557830:web:637cef85cdf89079e00e87",
  measurementId: "G-DPP3MTJKJG"
};

// Initialize Firebase
const myApp = initializeApp(firebaseConfig)
const db = getFirestore(myApp)

export { myApp, db }