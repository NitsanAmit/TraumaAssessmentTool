const { getApps, initializeApp, deleteApp } = require('firebase/app');
const { getFirestore } = require('firebase/firestore');
const { doc, setDoc } = require('firebase/firestore');
const questionnaires = require('./src/data/questions.json');
const dotenv = require('dotenv');
dotenv.config();


initializeApp({
  apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
  authDomain: process.env.REACT_APP_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.REACT_APP_FIREBASE_PROJECT_ID,
  storageBucket: process.env.REACT_APP_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.REACT_APP_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.REACT_APP_FIREBASE_APP_ID,
  measurementId: process.env.REACT_APP_FIREBASE_MEASUREMENT_ID,
});

const firestore = getFirestore(getApps()[0]);
console.log("Pushing questionnaires to Firestore...");
setDoc(doc(firestore, 'static', 'questionnaires'), { questionnaires })
  .then(() => {
    console.log('Questionnaires successfully pushed to Firestore.');
  })
  .catch((error) => {
  console.error('Error pushing questionnaires to Firestore.', error);
}).finally(() => {
  deleteApp(firestore.app);
});
