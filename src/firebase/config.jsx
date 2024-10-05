import { initializeApp } from "firebase/app";
import { getFirestore } from 'firebase/firestore'

const firebaseConfig = {
  apiKey: "AIzaSyCHezbSSnf5z9kDt0TykbOHHHnwQceB-Uc",
  authDomain: "miniblog-617bd.firebaseapp.com",
  projectId: "miniblog-617bd",
  storageBucket: "miniblog-617bd.appspot.com",
  messagingSenderId: "366271624894",
  appId: "1:366271624894:web:80d2c6ff419f53f79cd0ef"
};

const app = initializeApp(firebaseConfig);

const db = getFirestore(app);

export {db};