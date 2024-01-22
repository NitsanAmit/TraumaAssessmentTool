import { createContext } from 'react';

export type QuestionnaireContextType = {
  progress: number;
  maxProgress: number;
  verbalProgress: string;
} | undefined;

export const QuestionnaireContext = createContext<QuestionnaireContextType>(undefined);
