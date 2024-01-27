import { useFirebase } from './useFirebase';
import { QuestionnairesSummary } from '../../store/types';
import { collection, addDoc } from "firebase/firestore";
import { useCallback, useState } from 'react';
import { useDebugMode } from './useDebugMode';

const PII_QUESTIONNAIRES = ['free-text'];

export const useAnonymousResults = () => {

  const debugMode = useDebugMode();
  const [optOut, setOptOut] = useState(false);
  const optOutOfAnonymousDataCollection = useCallback(() => setOptOut(true), []);
  const { firestore } = useFirebase();
  if (!firestore) {
    return { optOutOfAnonymousDataCollection };
  }

  const sendAnonymousResults = (questionnaireResults: QuestionnairesSummary) => {
    if (debugMode || optOut) {
      return;
    }
    return addDoc(collection(firestore, "anonymousResults"), {
      results: questionnaireResults.filter(questionnaire => !PII_QUESTIONNAIRES.includes(questionnaire.questionnaireType)),
      create: new Date(),
    });
  };

  return { sendAnonymousResults, optOutOfAnonymousDataCollection: () => setOptOut(true) };
};
