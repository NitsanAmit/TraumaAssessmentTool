import { QuestionnairesStore } from '../../../store/QuestionnairesStore';
import { MinMaxScale } from './MinMaxScale';

export const QuestionnairesFlow: React.FC<QuestionnairesFlowProps> = ({ questionnairesStore}) => {

  return null;
}

export type QuestionnairesFlowProps = {
  questionnairesStore: QuestionnairesStore;
}

export type Question = {
  questionnaire: string;
  questionnaireType: string;
}

const questionTypeToComponentMap: Record<string, React.FC<any>> = {
  'min-max-scale': MinMaxScale,
};
