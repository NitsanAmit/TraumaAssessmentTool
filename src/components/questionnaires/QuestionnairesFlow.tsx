import { QuestionnairesStore } from '../../store/QuestionnairesStore';
import { MinMaxScale } from './base/MinMaxScale';
import styled from 'styled-components';
import { observer } from 'mobx-react-lite';
import { DiscreteScale } from './base/DiscreteScale';
import { YesNo } from './base/YesNo';
import { FreeNumeric } from './base/FreeNumeric';

export const QuestionnairesFlow: React.FC<QuestionnairesFlowProps> = observer(({ questionnairesStore }) => {

  const QuestionnaireComponent = questionTypeToComponentMap[questionnairesStore.currentQuestion.questionnaireType];
  const onNextClicked = (didPassScoreBar: boolean, score: number) => questionnairesStore.nextQuestion(didPassScoreBar, score);
  return (
    <QuestionnaireContainer className="flex-column align-center justify-center">
      <QuestionnaireComponent key={questionnairesStore.currentQuestion.questionnaire}
                              onNextClicked={onNextClicked} {...questionnairesStore.currentQuestion}/>
    </QuestionnaireContainer>
  );
});

export type QuestionnairesFlowProps = {
  questionnairesStore: QuestionnairesStore;
}

export type Question = {
  questionnaire: string;
  questionnaireType: string;
  onNextClicked: (didPassScoreBar: boolean, score: number) => void;
}

const questionTypeToComponentMap: Record<string, React.FC<any>> = {
  'min-max-scale': MinMaxScale,
  'discrete-scale': DiscreteScale,
  'yes-no': YesNo,
  'free-numeric': FreeNumeric,
};

const QuestionnaireContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 24px;
`;
