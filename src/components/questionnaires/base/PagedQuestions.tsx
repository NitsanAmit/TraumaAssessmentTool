import _ from 'lodash';
import { observer } from 'mobx-react-lite';
import { useCallback, useMemo, useState } from 'react';
import { PagedQuestion } from './PagedQuestion';
import { Button } from '@fluentui/react-components';
import styled from 'styled-components';
import { QuestionnaireBase } from './QuestionnaireBase';
import { mobile } from '../../styles/style.consts';


export const PagedQuestions: React.FC<PagedQuestionsProps> = observer(({
                                                                               initialState,
                                                                               questionTitle,
                                                                               questions,
                                                                               answers,
                                                                               onNext,
                                                                             }) => {
  const [answersValues, setAnswersValues] = useState<number[]>(initialState ?? []);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState<number>(0);
  const currentQuestion = useMemo(() => questions[currentQuestionIndex], [currentQuestionIndex, questions]);
  const forcePassthreshold = useMemo(() => {
    return _.some(questions, question => {
      return typeof question !== 'string'
        && question.forcePassthreshold !== undefined
        && answersValues[questions.indexOf(question)] >= question.forcePassthreshold;
    });
  },[answersValues, questions]);
  const onSelect = (question, value) => {
    const newAnswersValues = [...answersValues];
    newAnswersValues[questions.indexOf(question)] = value;
    setAnswersValues(newAnswersValues);
  };

  const isFirstQuestion = currentQuestionIndex === 0;
  const isLastQuestion = currentQuestionIndex === questions.length - 1;

  const onNextClicked = useCallback(() => {
    if (isLastQuestion) {
      onNext?.(answersValues, forcePassthreshold);
    } else {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    }
  }, [answersValues, currentQuestionIndex, forcePassthreshold, isLastQuestion, onNext]);

  return (
    <QuestionnaireBase questionTitle={isFirstQuestion ? questionTitle : undefined}
    subQuestionIndex={currentQuestionIndex} maxSubQuestions={questions.length - 1}>
      <div className="flex-column full-width align-center">
        <PagedQuestion key={currentQuestionIndex}
                       initialState={answersValues?.[currentQuestionIndex]}
                       question={currentQuestion}
                       answers={answers}
                       onChange={value => onSelect(currentQuestion, value)}/>
        <StyledButtonsContainer>
          <StyledButton
            size="large"
            appearance="primary"
            className="flex-1 margin-ml"
            iconPosition="after"
            shape="circular"
            onClick={onNextClicked}
            disabled={_.isNil(answersValues?.[currentQuestionIndex])}>
            {isLastQuestion ? 'לשאלון הבא' : 'לשאלה הבאה'}
          </StyledButton>
          {
            !isFirstQuestion &&
            <StyledBackButton
              appearance="transparent"
              className="flex-1 margin-ml"
              shape="circular"
              onClick={() => setCurrentQuestionIndex(currentQuestionIndex - 1)}>
              לשאלה הקודמת
            </StyledBackButton>
          }
        </StyledButtonsContainer>
      </div>
    </QuestionnaireBase>
  );
});

export type PagedQuestionsProps = {
  questionTitle: string;
  initialState?: number[];
  onNext?: (answersValues: number[], forcePassthreshold?: boolean) => void;
  questions: (string | { text: string; reverseScore?: boolean, forcePassthreshold?: number })[];
  answers: {
    label: string;
    value: number;
  }[];
}

const StyledButtonsContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  row-gap: 16px;
  margin-top: 16px;
`,
  StyledButton = styled(Button)`
    padding: 12px;
    max-width: ${mobile.min};
    width: 100%;
  `,
  StyledBackButton = styled(Button)`
    max-width: ${mobile.min};
    width: 100%;
  `;
