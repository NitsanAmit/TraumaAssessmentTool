import { useEffect, useState } from 'react';
import firebase from 'firebase/app';
import { getFirestore, Firestore } from 'firebase/firestore';

const useFirestore = () => {
  const [firestore, setFirestore] = useState<Firestore | null>(null);

  useEffect(() => {
    const initializeFirestore = async () => {
      try {
        if (!firebase.getApps().length) {
          await firebase.initializeApp({
            apiKey: process.env.FIREBASE_API_KEY,
            authDomain: process.env.FIREBASE_AUTH_DOMAIN,
            projectId: process.env.FIREBASE_PROJECT_ID,
            storageBucket: process.env.FIREBASE_STORAGE_BUCKET,
            messagingSenderId: process.env.FIREBASE_MESSAGING_SENDER_ID,
            appId: process.env.FIREBASE_APP_ID,
          });
        }

        const firestoreInstance = getFirestore();
        setFirestore(firestoreInstance!);
      } catch (error) {
        console.error('Error initializing Firebase:', error);
      }
    };

    initializeFirestore();
  }, []);

  return firestore!;
};

export default useFirestore;
