import { useEffect } from 'react';
import { getApps, initializeApp } from 'firebase/app';
import { Firestore, getFirestore } from 'firebase/firestore';

export const useFirebase = () => {

  useEffect(() => {
    const initializeFirestore = async () => {
      try {
        if (!getApps().length) {
          await initializeApp({
            apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
            authDomain: process.env.REACT_APP_FIREBASE_AUTH_DOMAIN,
            projectId: process.env.REACT_APP_FIREBASE_PROJECT_ID,
            storageBucket: process.env.REACT_APP_FIREBASE_STORAGE_BUCKET,
            messagingSenderId: process.env.REACT_APP_FIREBASE_MESSAGING_SENDER_ID,
            appId: process.env.REACT_APP_FIREBASE_APP_ID,
          });
        }
      } catch (error) {
        console.error('Error initializing Firebase:', error);
      }
    };

    initializeFirestore();
  }, []);

  return { firestore: getApps().length ? getFirestore() as Firestore : null };
};
