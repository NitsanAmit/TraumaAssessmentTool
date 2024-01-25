import { useQuestionnaireComponent } from '../QuestionnairesFlow';
import styled from 'styled-components';
import { observer } from 'mobx-react-lite';
import { Button } from '@fluentui/react-components';
import { useMemo, useState } from 'react';
import { QuestionnaireBaseProps } from './types';
import { QuestionnaireBase } from './QuestionnaireBase';

export type ConditionProps = QuestionnaireBaseProps & {
  conditionResult: boolean;
  questionTitle: string;
  conditionQuestionnaire: QuestionnaireBaseProps;
};

export const Condition: React.FC<ConditionProps> = observer(({
                                                               initialState,
                                                               onNextClicked,
                                                               questionTitle,
                                                               conditionResult,
                                                               conditionQuestionnaire
                                                             }) => {

  const [passedCondition, setPassedCondition] = useState<boolean>(false);
  const QuestionnaireComponent = useQuestionnaireComponent(conditionQuestionnaire, initialState, onNextClicked);
  const onNext = useMemo(() => onNextClicked ? () => onNextClicked(initialState, false, undefined) : undefined, [onNextClicked, initialState]);

  return (
    <>
      {
        !passedCondition &&
        <QuestionnaireBase questionTitle={questionTitle}>
          <StyledContainer>
            <Button appearance="primary" size="large" shape="circular" onClick={() => setPassedCondition(true)}>
              כן
            </Button>
            <Button appearance="primary" size="large" shape="circular" onClick={onNext}>
              לא
            </Button>
          </StyledContainer>
        </QuestionnaireBase>
      }
      {
        passedCondition &&
        QuestionnaireComponent
      }
    </>
  );
});

const StyledContainer = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  height: 100%;
  width: 100%;
  column-gap: 16px;
`;
