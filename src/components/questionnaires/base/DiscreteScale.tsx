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
  answers: {
    label: string;
    value: number;
  }[];
}

export const DiscreteScale: React.FC<DiscreteScaleProps> = observer(({
                                                                       scoreBar,
                                                                       questions,
                                                                       answers,
                                                                       questionTitle,
                                                                       onNextClicked,
                                                                     }) => {
  const [didPassScoreBar, setDidPassScoreBar] = useState<boolean>(false);
  const [score, setScore] = useState<number>(0);
  const [completedAllQuestions, setCompletedAllQuestions] = useState<boolean>(false);

  const onChange = (answersValues: number[]) => {
    const actualValues = answersValues.filter(v => v !== undefined);
    const newScore = actualValues.reduce((acc, curr) => acc + curr, 0);
    setScore(newScore);
    setDidPassScoreBar(newScore >= scoreBar);
    setCompletedAllQuestions(actualValues.length === questions.length);
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
