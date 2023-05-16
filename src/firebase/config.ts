// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
// export const firebaseConfig = {
//     apiKey: "AIzaSyA3yonam0h7CCANbfDuOTwjVUddD38m4j0",
//     authDomain: "crud-eedeb.firebaseapp.com",
//     projectId: "crud-eedeb",
//     storageBucket: "crud-eedeb.appspot.com",
//     messagingSenderId: "560007228642",
//     appId: "1:560007228642:web:9ad89102c6d8dfe4ff82bb",
//     measurementId: "G-C3GMRZP99C"
// };


export const firebaseConfig = {
    apiKey: "AIzaSyDKSM1PplOGuFFmgkQF-Vr1rt1id6QO2ec",
    authDomain: "crud1-25c6f.firebaseapp.com",
    projectId: "crud1-25c6f",
    storageBucket: "crud1-25c6f.appspot.com",
    messagingSenderId: "276588231663",
    appId: "1:276588231663:web:c50924823fb3b21858541a",
    measurementId: "G-RLMEESM6DP"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);