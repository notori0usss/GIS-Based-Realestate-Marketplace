import firebase from "firebase/app"
import "firebase/auth"
import "firebase/storage"
import "firebase/firestore"

const app = firebase.inializeApp({
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
