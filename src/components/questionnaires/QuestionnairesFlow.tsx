import { QuestionnairesStore } from '../../store/QuestionnairesStore';
import styled from 'styled-components';
import { observer } from 'mobx-react-lite';
import { useCallback } from 'react';
import { OnNextClickedFunction, QuestionBase, questionTypeToComponentMap } from './base/types';
import { SecondSectionIntro } from '../SecondSectionIntro';
import { QuestionnaireContext } from '../../store/QuestionnaireContext';
import { QuestionnaireTypes } from '../../data/data.consts';

export const QuestionnairesFlow: React.FC<QuestionnairesFlowProps> = observer(({ questionnairesStore }) => {
  const onNextClicked = useCallback((state: unknown, didPassThreshold: boolean, score?: number | string) => {
      questionnairesStore.nextQuestion(state, didPassThreshold, score);
      scrollToTop();
    }
    , [questionnairesStore]);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  return <div className="full-width flex-column full-height">
    {
      questionnairesStore.currentQuestion.questionnaireType !== QuestionnaireTypes.CUT_OFF &&
      <QuestionnaireContext.Provider value={questionnairesStore.questionnaireContext}>
        {
          useQuestionnaireComponent(questionnairesStore.currentQuestion, questionnairesStore.currentQuestionState, onNextClicked)
        }
      </QuestionnaireContext.Provider>
    }
    {
      questionnairesStore.currentQuestion.questionnaireType === QuestionnaireTypes.CUT_OFF &&
      <SecondSectionIntro questionnairesStore={questionnairesStore} />
    }
  </div>;
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
  width: 100%;
`;
