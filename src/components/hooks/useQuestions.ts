import { useFirebase } from './useFirebase';
import { getValue } from "firebase/remote-config";
import { useEffect, useState } from 'react';
import { QuestionBase } from '../questionnaires/base/types';

export const useQuestions = () => {

  const [questions, setQuestions] = useState<QuestionBase[]>();
  const { remoteConfig } = useFirebase();
  useEffect(() => {
    if (!remoteConfig) {
      return;
    }
    const getQuestions = async () => {
      const questions = await getValue(remoteConfig, 'questions');
      setQuestions(JSON.parse(questions.asString()) as QuestionBase[]);
    };
    getQuestions();
  }, [remoteConfig]);

  return questions;
};
