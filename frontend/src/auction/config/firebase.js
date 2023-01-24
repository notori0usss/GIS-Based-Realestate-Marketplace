import firebase from "firebase/compat/app"
import "firebase/compat/auth"
import "firebase/compat/storage"
import "firebase/compat/firestore"

const app = firebase.initializeApp({
  apiKey: "AIzaSyCDkbHnDuhxcf_Bquj_cCJTXnM7ePnz4Hw",
  authDomain: "auction-ae24f.firebaseapp.com",
  projectId: "auction-ae24f",
  storageBucket: "auction-ae24f.appspot.com",
  messagingSenderId: "1079740053006",
  appId: "1:1079740053006:web:a3ee07c27b84c80a08ae5f",
})

export const timestamp = firebase.firestore.FieldValue.serverTimestamp
export const firestoreApp = app.firestore()
export const storageApp = app.storage()
export const authApp = app.auth()
