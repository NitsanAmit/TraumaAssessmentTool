import { FirebaseApp, getApps, initializeApp } from 'firebase/app';
import { createContext, useEffect, useState } from 'react';

export async function initializeFirebase(): Promise<FirebaseApp | undefined> {
  try {
    if (!getApps().length) {
      const devEnv = process.env.NODE_ENV === 'development';
      return initializeApp(devEnv ? {
        apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
        authDomain: process.env.REACT_APP_FIREBASE_AUTH_DOMAIN,
        projectId: process.env.REACT_APP_FIREBASE_PROJECT_ID,
        storageBucket: process.env.REACT_APP_FIREBASE_STORAGE_BUCKET,
        messagingSenderId: process.env.REACT_APP_FIREBASE_MESSAGING_SENDER_ID,
        appId: process.env.REACT_APP_FIREBASE_APP_ID,
        measurementId: process.env.REACT_APP_FIREBASE_MEASUREMENT_ID,
      } : {
        apiKey: process.env.FIREBASE_API_KEY,
        authDomain: process.env.FIREBASE_AUTH_DOMAIN,
        projectId: process.env.FIREBASE_PROJECT_ID,
        storageBucket: process.env.FIREBASE_STORAGE_BUCKET,
        messagingSenderId: process.env.FIREBASE_MESSAGING_SENDER_ID,
        appId: process.env.FIREBASE_APP_ID,
        measurementId: process.env.FIREBASE_MEASUREMENT_ID,
      });
    }
  } catch (error) {
    console.error('Error initializing Firebase:', error);
  }
}

export const FirebaseProvider = ({ children }) => {

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    initializeFirebase().then(() => setLoading(false));
  }, [])


  return (
    <FirebaseContext.Provider value={loading ? undefined : getApps()?.[0]}>
      {children}
    </FirebaseContext.Provider>
  );
}

export const FirebaseContext = createContext<FirebaseApp | undefined>(undefined);
