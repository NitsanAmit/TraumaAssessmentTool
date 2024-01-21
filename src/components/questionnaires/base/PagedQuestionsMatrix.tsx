import _ from 'lodash';
import { observer } from 'mobx-react-lite';
import { useState } from 'react';
import { PagedQuestion } from './PagedQuestion';
import { Button, ProgressBar } from '@fluentui/react-components';
import { ChevronLeft16Regular, ChevronRight16Regular } from '@fluentui/react-icons/lib/fonts';
import styled from 'styled-components';
import { QuestionnaireBase } from './QuestionnaireBase';


export const PagedQuestionsMatrix: React.FC<PagedQuestionsProps> = observer(({
                                                                               initialState,
                                                                               questionTitle,
                                                                               questions,
                                                                               answers,
                                                                               onNext,
                                                                             }) => {
  const [answersValues, setAnswersValues] = useState<number[]>(initialState ?? []);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState<number>(0);
  const onSelect = (question, value) => {
    const newAnswersValues = [...answersValues];
    newAnswersValues[questions.indexOf(question)] = value;
    setAnswersValues(newAnswersValues);
  };

  const isFirstQuestion = currentQuestionIndex === 0;
  const isLastQuestion = currentQuestionIndex === questions.length - 1;

  return (
    <QuestionnaireBase questionTitle={isFirstQuestion ? questionTitle : undefined} >
      <div className="flex-column full-width align-center">
        <PagedQuestion key={currentQuestionIndex}
                       initialState={answersValues?.[currentQuestionIndex]}
                       question={questions[currentQuestionIndex]}
                       answers={answers}
                       onChange={value => onSelect(questions[currentQuestionIndex], value)}/>
        <StyledButtonsContainer>
          <Button
            size="large"
            appearance="primary"
            className="flex-1 margin-ml"
            icon={<ChevronLeft16Regular/>}
            iconPosition="after"
            onClick={() => isLastQuestion ? onNext?.(answersValues) : setCurrentQuestionIndex(currentQuestionIndex + 1)}
            disabled={_.isNil(answersValues[currentQuestionIndex])}>
            {isLastQuestion ? 'לשאלון הבא' : 'לשאלה הבאה'}
          </Button>
          {
            !isFirstQuestion &&
            <Button
              appearance="secondary"
              className="flex-1 margin-ml"
              icon={<ChevronRight16Regular/>}
              onClick={() => setCurrentQuestionIndex(currentQuestionIndex - 1)}>
              לשאלה הקודמת
            </Button>
          }
        </StyledButtonsContainer>
        <ProgressBar
          className="margin-top-sm w-90"
          thickness="medium"
          shape="rounded"
          value={currentQuestionIndex / questions.length}
        />
      </div>
    </QuestionnaireBase>
  );
});

export type PagedQuestionsProps = {
  questionTitle: string;
  initialState?: number[];
  onNext?: (answersValues: number[]) => void;
  questions: (string | { text: string; reverseScore: boolean })[];
  answers: {
    label: string;
    value: number;
  }[];
}

const StyledButtonsContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  row-gap: 16px;
  margin-top: 16px;
`;
