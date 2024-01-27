import { useFirebase } from './useFirebase';
import { useEffect, useState } from 'react';
import { QuestionBase } from '../questionnaires/base/types';
import { doc, getDoc } from 'firebase/firestore';
import fallbackQuestionnaires from '../../data/questions.json';

export const useQuestions = () => {

  const [questions, setQuestions] = useState<(QuestionBase & unknown)[]>();
  const { firestore } = useFirebase();
  useEffect(() => {
    if (!firestore || questions) {
      return;
    }
    const getQuestions = async () => {
      try {
        const questions = await getDoc(doc(firestore, 'static', 'questionnaires'));
        if (questions.exists()) {
          setQuestions(questions.data()['questionnaires'] as QuestionBase[]);
        }
      } catch (error) {
        console.error('Error getting questionnaires from Firestore, using local fallback.', error);
      }
    };
    getQuestions();
  }, [questions, firestore]);

  return questions ?? fallbackQuestionnaires;
};
