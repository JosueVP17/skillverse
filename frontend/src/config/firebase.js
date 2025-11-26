import { initializeApp } from 'firebase/app'
import { getFirestore } from 'firebase/firestore'

const firebaseConfig = {
  apiKey: 'AIzaSyBQuHRgImr21fHMeawKwUd1Dc03DdLEnMw',
  authDomain: 'skillverse-81704.firebaseapp.com',
  projectId: 'skillverse-81704',
  storageBucket: 'skillverse-81704.firebasestorage.app',
  messagingSenderId: '53638296282',
  appId: '1:53638296282:web:2b0bfba0e1147a6a60abe3',
}

const app = initializeApp(firebaseConfig)
export const db = getFirestore(app)
