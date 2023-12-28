import { Question } from './QuestionnairesFlow';

export type MinMaxScaleProps = Question & {
  scoreBar: number;
  min: number;
  max: number;
  minLabel: string;
  maxLabel: string;
  questionTitle: string;
}

export const MinMaxScale: React.FC<MinMaxScaleProps> = ({ scoreBar, min, max, minLabel, maxLabel, questionTitle }) => {
  return null;
}
