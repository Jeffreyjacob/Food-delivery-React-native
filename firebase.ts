import firebase from 'firebase/compat/app';
import 'firebase/compat/firestore';



const firebaseConfig = {
    apiKey: "AIzaSyBnH6AwXkJ-gRDT2OqBTbqkcIcyQGFMYhI",
    authDomain: "food-delivery-28a8d.firebaseapp.com",
    projectId: "food-delivery-28a8d",
    storageBucket: "food-delivery-28a8d.appspot.com",
    messagingSenderId: "755573410041",
    appId: "1:755573410041:web:a3ea834e4970591db67a28",
    measurementId: "G-8NPB28HN9G"
  };

const firebaseApp = firebase.initializeApp(firebaseConfig);
const db = firebaseApp.firestore();

export {db}