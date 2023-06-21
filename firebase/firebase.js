import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getStorage } from "firebase/storage";
import { getFirestore } from "firebase/firestore";


const firebaseConfig = {
  apiKey: "AIzaSyBoFnQJkFULMcn3JkcBIU2hWpdl48-U-bo",
  authDomain: "fir-chat-app-f4a4b.firebaseapp.com",
  projectId: "fir-chat-app-f4a4b",
  storageBucket: "fir-chat-app-f4a4b.appspot.com",
  messagingSenderId: "179536998042",
  appId: "1:179536998042:web:97dcea239d70d1eed5b923"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const storage = getStorage(app);
export const db = getFirestore(app);