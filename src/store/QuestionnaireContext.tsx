import { createContext } from 'react';

export type QuestionnaireContextType = {
  progress: number;
  maxProgress: number;
} | undefined;

export const QuestionnaireContext = createContext<QuestionnaireContextType>(undefined);
