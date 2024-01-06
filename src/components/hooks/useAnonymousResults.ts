import { useFirestore } from './useFirebase';
import { QuestionnairesSummary } from '../../store/types';
import { collection, addDoc } from "firebase/firestore";

const PII_QUESTIONNAIRES = ['free-text'];

export const useAnonymousResults = () => {

  const firestore = useFirestore();
  if (!firestore) {
    return {};
  }

  const sendAnonymousResults = (questionnaireResults: QuestionnairesSummary) => {
    return addDoc(collection(firestore, "anonymousResults"), {
      results: questionnaireResults.filter(questionnaire => !PII_QUESTIONNAIRES.includes(questionnaire.questionnaireType)),
      create: new Date(),
    });
  };

  return { sendAnonymousResults };
};
