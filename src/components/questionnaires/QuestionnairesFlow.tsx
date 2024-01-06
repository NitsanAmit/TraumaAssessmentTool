import { QuestionnairesStore } from '../../store/QuestionnairesStore';
import styled from 'styled-components';
import { observer } from 'mobx-react-lite';
import { useCallback } from 'react';
import { OnNextClickedFunction, QuestionBase, questionTypeToComponentMap } from './base/types';


export const QuestionnairesFlow: React.FC<QuestionnairesFlowProps> = observer(({ questionnairesStore }) => {
  const onNextClicked = useCallback((state: unknown, didPassScoreBar: boolean, score: number | string) => {
      questionnairesStore.nextQuestion(state, didPassScoreBar, score);
      scrollToTop();
    }
    , [questionnairesStore]);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  return useQuestionnaireComponent(questionnairesStore.currentQuestion, questionnairesStore.currentQuestionState, onNextClicked);
});

export const useQuestionnaireComponent = (questionnaire: QuestionBase, initialState: unknown, onNextClicked?: OnNextClickedFunction) => {
  const QuestionnaireComponent = questionTypeToComponentMap[questionnaire.questionnaireType];
  return (
    <QuestionnaireContainer>
      <QuestionnaireComponent key={questionnaire.questionnaire}
                              {...questionnaire}
                              initialState={initialState}
                              onNextClicked={onNextClicked}/>
    </QuestionnaireContainer>
  );
};

export type QuestionnairesFlowProps = {
  questionnairesStore: QuestionnairesStore;
}

const QuestionnaireContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100%;
`;
