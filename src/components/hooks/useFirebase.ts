import { FirebaseApp } from 'firebase/app';
import { Analytics, getAnalytics, logEvent } from 'firebase/analytics';
import { Firestore, getFirestore } from 'firebase/firestore';
import { getAuth } from 'firebase/auth';
import { useCallback, useContext } from 'react';
import { FirebaseContext } from '../../networking/firebase';

export const useFirebase = () => {

  const firebaseContext = useContext<FirebaseApp | undefined>(FirebaseContext);

  const _logEvent = useCallback((eventName: string, eventParams?: Record<string, unknown>) => {
    if (firebaseContext) {
      try {
        logEvent(getAnalytics(firebaseContext), eventName, eventParams);
      } catch (e) {
        console.error(e);
      }
    }
  }, [firebaseContext]);

  return {
    initialized: !!firebaseContext,
    firestore: firebaseContext ? getFirestore(firebaseContext) as Firestore : null,
    analytics: firebaseContext ? getAnalytics(firebaseContext) as Analytics : null,
    auth: firebaseContext ? getAuth(firebaseContext) : null,
    user: firebaseContext ? getAuth(firebaseContext).currentUser : null,
    logEvent: _logEvent,
  };

};
