import { initializeApp } from "firebase/app";
import {getAuth} from "firebase/auth"
import {getFirestore} from "firebase/firestore"
import {getStorage} from "firebase/storage"

const firebaseConfig = {
  apiKey: "AIzaSyA4Bq0bPVQ_H90pLgNvPRNMWZCrOP2g7Fo",
  authDomain: "react-ozo-money.firebaseapp.com",
  databaseURL: "https://react-ozo-money-default-rtdb.firebaseio.com",
  projectId: "react-ozo-money",
  storageBucket: "react-ozo-money.appspot.com",
  messagingSenderId: "615443391391",
  appId: "1:615443391391:web:9dda5a6cc12675fdf413aa"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app)
export const db = getFirestore(app)
export const storage = getStorage(app)
