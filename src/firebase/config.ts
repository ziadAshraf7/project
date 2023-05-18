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
    apiKey: "AIzaSyDZ7oTNeNW6dkoqqCTGtk0J--xcX9TekDw",
    authDomain: "crud-cc611.firebaseapp.com",
    projectId: "crud-cc611",
    storageBucket: "crud-cc611.appspot.com",
    messagingSenderId: "5269621268",
    appId: "1:5269621268:web:6d2cf59cc85c1623ef7501",
    measurementId: "G-8N08WJ5NHJ"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);