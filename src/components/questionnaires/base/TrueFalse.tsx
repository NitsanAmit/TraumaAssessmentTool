import { useCallback } from 'react';
import { observer } from 'mobx-react-lite';
import { QuestionnaireBaseProps } from './types';
import { QuestionnaireBase } from './QuestionnaireBase';
import { Button } from '@fluentui/react-components';
import styled from 'styled-components';

export type TrueFalseProps = QuestionnaireBaseProps & {
  questionTitle: string;
}

export const TrueFalse: React.FC<TrueFalseProps> = observer(({
                                                       questionTitle,
                                                       onNextClicked,
                                                     }) => {

  const onNext = useCallback((answer: boolean) => {
    if (!onNextClicked) {
      return;
    }
    onNextClicked(answer, answer, answer ? 1 : 0);
  }, [onNextClicked]);

  return (
    <QuestionnaireBase questionTitle={questionTitle}>
      <StyledContainer>
        <Button appearance="primary" size="large" onClick={() => onNext(true)}>
          כן
        </Button>
        <Button appearance="primary" size="large" onClick={() => onNext(false)}>
          לא
        </Button>
      </StyledContainer>
    </QuestionnaireBase>
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
