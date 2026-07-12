import { initializeApp } from "firebase/app";

import {
    getAuth,
    GoogleAuthProvider,
} from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyADUJpxp7cem5lK9lUbe2wjcLiSNvnW_QQ",
  authDomain: "researchhub-ai.firebaseapp.com",
  projectId: "researchhub-ai",
  storageBucket: "researchhub-ai.firebasestorage.app",
  messagingSenderId: "931595481069",
  appId: "1:931595481069:web:94bca06ccac2a7429a41e4",
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);

export const googleProvider =
new GoogleAuthProvider();