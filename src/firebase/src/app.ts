import { initializeApp } from 'firebase/app';
import { firebaseConfig } from '../config';
import { getFirestore } from "firebase/firestore";


export const app = initializeApp(firebaseConfig);
export const firestore = getFirestore(app);
export const db = getFirestore(app);