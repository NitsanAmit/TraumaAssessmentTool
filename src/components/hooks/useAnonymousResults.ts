import { useFirebase } from './useFirebase';
import { QuestionnairesSummary } from '../../store/types';
import { addDoc, collection, doc, setDoc } from 'firebase/firestore';
import { useCallback, useEffect, useState } from 'react';
import { useDebugMode } from './useDebugMode';
import { setUserId } from 'firebase/analytics';

const PII_QUESTIONNAIRES = ['free-text'];

export const useAnonymousResults = () => {

  const debugMode = useDebugMode();
  const [optOut, setOptOut] = useState(false);
  const [anonymousUserId, setAnonymousUserId] = useState<string | null>(null);
  const optOutOfAnonymousDataCollection = useCallback(() => setOptOut(true), []);
  const { firestore, analytics } = useFirebase();

  useEffect(() => {
    if (firestore && analytics) {
      const newUserRef = doc(collection(firestore, 'anonymousResults'));
      setAnonymousUserId(newUserRef.id);
      setUserId(analytics, newUserRef.id);
    }
  }, [firestore, analytics]);

  if (!firestore) {
    return { anonymousUserId, optOutOfAnonymousDataCollection };
  }

  const sendAnonymousResults = (questionnaireResults: QuestionnairesSummary) => {
    if (debugMode || optOut) {
      return;
    }
    const docData = {
      results: questionnaireResults.filter(questionnaire => !PII_QUESTIONNAIRES.includes(questionnaire.questionnaireType)),
      created: new Date(),
    };
    const anonymousResultsCollectionRef = collection(firestore, 'anonymousResults');
    return anonymousUserId
      ? setDoc(doc(anonymousResultsCollectionRef, anonymousUserId), docData)
      : addDoc(anonymousResultsCollectionRef, docData);
  };

  return {
    anonymousUserId,
    sendAnonymousResults,
    optOutOfAnonymousDataCollection: () => setOptOut(true),
  };
};
