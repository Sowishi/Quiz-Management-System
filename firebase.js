import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyC-I9xeGb6Wht1DE_tdcfJJQBRxlnjgVr0",
  authDomain: "quiz-management-263da.firebaseapp.com",
  projectId: "quiz-management-263da",
  storageBucket: "quiz-management-263da.appspot.com",
  messagingSenderId: "818867792389",
  appId: "1:818867792389:web:b7e9d898372094e1d74a6c",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export { app, db };
