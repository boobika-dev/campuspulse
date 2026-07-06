import { initializeApp } from "firebase/app"
import { getAuth } from "firebase/auth"
import { getFirestore } from "firebase/firestore"

const firebaseConfig = {
  apiKey: "AIzaSyDkLqwTEq9mzXU2lmv4Bg4OSsZFTQqufes",
  authDomain: "campuspulse-bd226.firebaseapp.com",
  projectId: "campuspulse-bd226",
  storageBucket: "campuspulse-bd226.firebasestorage.app",
  messagingSenderId: "878832201714",
  appId: "1:878832201714:web:f289cb0253fd489ee0456b"
}

const app = initializeApp(firebaseConfig)
export const auth = getAuth(app)
export const db = getFirestore(app)