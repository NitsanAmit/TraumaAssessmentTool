import { Question } from '../QuestionnairesFlow';
import styled from 'styled-components';
import { Button } from 'monday-ui-react-core';
import { useState } from 'react';
import { observer } from 'mobx-react-lite';
import { QuestionsMatrix } from './QuestionsMatrix';

export type DiscreteScaleProps = Question & {
  scoreBar: number;
  questionTitle: string;
  questions: string[];
}

const answers = [
  { label: 'לא', value: 0 },
  { label: 'כן', value: 1 },
];

export const YesNo: React.FC<DiscreteScaleProps> = observer(({
                                                               scoreBar,
                                                               questions,
                                                               questionTitle,
                                                               onNextClicked,
                                                             }) => {
  const [didPassScoreBar, setDidPassScoreBar] = useState<boolean>(false);
  const [score, setScore] = useState<number>(0);
  const [completedAllQuestions, setCompletedAllQuestions] = useState<boolean>(false);

  const onChange = (answersValues: number[]) => {
    const newScore = answersValues.reduce((acc, curr) => acc + curr, 0);
    setScore(newScore);
    setDidPassScoreBar(newScore >= scoreBar);
    setCompletedAllQuestions(answersValues.length === questions.length);
  };
  return (
    <>
      <QuestionTitle>{questionTitle}</QuestionTitle>
      <div className="flex-row full-width">
        <QuestionsMatrix key={questionTitle} questions={questions} answers={answers} onChange={onChange}/>
      </div>
      <Button className="margin-top-ml" onClick={() => onNextClicked(didPassScoreBar, score)}
              disabled={!completedAllQuestions}>המשך</Button>
    </>
  );
});

const QuestionTitle = styled.h2`
  color: salmon;
  text-align: center;
`;
