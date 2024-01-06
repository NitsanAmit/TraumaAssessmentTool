import { useEffect, useState } from 'react';
import { initializeApp, getApps, FirebaseApp} from "firebase/app";
import { getFirestore, Firestore } from 'firebase/firestore';

export const useFirestore = () => {
  const [firestore, setFirestore] = useState<Firestore | null>(null);

  useEffect(() => {
    const initializeFirestore = async () => {
      try {
        if (!getApps().length) {
          const firebaseApp = await initializeApp({
            apiKey: process.env.FIREBASE_API_KEY,
            authDomain: process.env.FIREBASE_AUTH_DOMAIN,
            projectId: process.env.FIREBASE_PROJECT_ID,
            storageBucket: process.env.FIREBASE_STORAGE_BUCKET,
            messagingSenderId: process.env.FIREBASE_MESSAGING_SENDER_ID,
            appId: process.env.FIREBASE_APP_ID,
          });
          const firestoreInstance = getFirestore(firebaseApp);
          setFirestore(firestoreInstance);
        }
      } catch (error) {
        console.error('Error initializing Firebase:', error);
      }
    };

    initializeFirestore();
  }, []);

  return firestore;
};
