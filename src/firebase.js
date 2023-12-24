// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: 'AIzaSyB3vgoFyJ7ujCAxkwvlm9NIlmWdLL0HV2Q',
  authDomain: 'vue-crm-artaleal.firebaseapp.com',
  projectId: 'vue-crm-artaleal',
  storageBucket: 'vue-crm-artaleal.appspot.com',
  messagingSenderId: '944147303305',
  appId: '1:944147303305:web:a4bbb2b1d8da1e0fa46f58',
  measurementId: 'G-S8HDCR5Y1H',
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
