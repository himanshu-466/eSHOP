import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore"
import { getStorage } from "firebase/storage";
const firebaseConfig = {
    apiKey: "AIzaSyCzrcy9Iy2FfHg66g8MnmO8IM8Yf9X-e3Q",
    authDomain: "eshop-ce14f.firebaseapp.com",
    projectId: "eshop-ce14f",
    storageBucket: "eshop-ce14f.appspot.com",
    messagingSenderId: "96246277882",
    appId: "1:96246277882:web:0182ee296dffc90b7d0b43"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
export const storage = getStorage(app);
export default app;

