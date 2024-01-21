import { QuestionnairesStore } from '../../store/QuestionnairesStore';
import styled from 'styled-components';
import { observer } from 'mobx-react-lite';
import { useCallback } from 'react';
import { OnNextClickedFunction, QuestionBase, QuestionnaireTypes, questionTypeToComponentMap } from './base/types';
import { ProgressBar, tokens } from '@fluentui/react-components';

export const QuestionnairesFlow: React.FC<QuestionnairesFlowProps> = observer(({ questionnairesStore }) => {
  const onNextClicked = useCallback((state: unknown, didPassScoreBar: boolean, score: number | string) => {
      questionnairesStore.nextQuestion(state, didPassScoreBar, score);
      scrollToTop();
    }
    , [questionnairesStore]);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  return <div className="full-width flex-column">
    {
      questionnairesStore.currentQuestion.questionnaireType !== QuestionnaireTypes.CUT_OFF &&
      <div className="full-width flex-column">
        <ProgressBar
          className="margin-top-sm margin-bottom-xxs"
          thickness="large"
          shape="rounded"
          value={questionnairesStore.progress}
          max={questionnairesStore.maxProgress}
        />
        <StyledProgressText>{questionnairesStore.verbalProgress}</StyledProgressText>
      </div>
    }
    {
      useQuestionnaireComponent(questionnairesStore.currentQuestion, questionnairesStore.currentQuestionState, onNextClicked)
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
`, StyledProgressText = styled.div`
  font-size: 12px;
  width: 100%;
  text-align: left;
  color: ${tokens.colorBrandBackground};
`;
