import { useEffect, useState } from 'react';
import { initializeApp, getApps} from "firebase/app";
import { getRemoteConfig, RemoteConfig, fetchAndActivate } from "firebase/remote-config";
import { getFirestore, Firestore } from 'firebase/firestore';
import fallbackQuestions from '../../data/questions.json';

export const useFirebase = () => {
  const [firestore, setFirestore] = useState<Firestore | null>(null);
  const [remoteConfig, setRemoteConfig] = useState<RemoteConfig | null>(null);

  useEffect(() => {
    const initializeFirestore = async () => {
      try {
        if (!getApps().length) {
          const firebaseApp = await initializeApp({
            apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
            authDomain: process.env.REACT_APP_FIREBASE_AUTH_DOMAIN,
            projectId: process.env.REACT_APP_FIREBASE_PROJECT_ID,
            storageBucket: process.env.REACT_APP_FIREBASE_STORAGE_BUCKET,
            messagingSenderId: process.env.REACT_APP_FIREBASE_MESSAGING_SENDER_ID,
            appId: process.env.REACT_APP_FIREBASE_APP_ID,
          });
          const firestoreInstance = getFirestore(firebaseApp);
          setFirestore(firestoreInstance);
          const remoteConfigInstance = getRemoteConfig(firebaseApp);
          remoteConfigInstance.settings.minimumFetchIntervalMillis = /* 10 minutes */ 1000 * 60 * 10;
          remoteConfigInstance.defaultConfig = { questions: JSON.stringify(fallbackQuestions.questions) };
          await fetchAndActivate(remoteConfigInstance);
          setRemoteConfig(remoteConfigInstance);
        }
      } catch (error) {
        console.error('Error initializing Firebase:', error);
      }
    };

    initializeFirestore();
  }, []);

  return { firestore, remoteConfig };
};
