const { getApps, initializeApp, deleteApp } = require('firebase/app');
const { getFirestore } = require('firebase/firestore');
const { doc, setDoc } = require('firebase/firestore');
const questionnaires = require('./src/data/questions.json');

initializeApp({
  apiKey: process.env.FIREBASE_API_KEY,
  authDomain: process.env.FIREBASE_AUTH_DOMAIN,
  projectId: process.env.FIREBASE_PROJECT_ID,
  storageBucket: process.env.FIREBASE_STORAGE_BUCKET,
  appId: process.env.FIREBASE_APP_ID,
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
