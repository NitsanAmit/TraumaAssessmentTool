import { Question } from '../QuestionnairesFlow';
import styled from 'styled-components';
import { Button, TextField } from 'monday-ui-react-core';
import { useMemo, useState } from 'react';
import { observer } from 'mobx-react-lite';
import _ from 'lodash';

export type DiscreteScaleProps = Question & {
  scoreBar: number;
  questionTitle: string;
  questions: {
    description: string;
    questionLabel: string;
    minValue: number;
    maxValue: number;
  }[];
}

export const FreeNumeric: React.FC<DiscreteScaleProps> = observer(({
                                                                     scoreBar,
                                                                     questions,
                                                                     questionTitle,
                                                                     onNextClicked,
                                                                   }) => {

  const [answersValues, setAnswersValues] = useState<number[]>([]);
  const score = useMemo(() => _.reject(answersValues, _.isEmpty).reduce((acc, curr) => acc + curr, 0), [answersValues]);
  const didPassScoreBar = useMemo(() => score >= scoreBar, [score, scoreBar]);
  const completedAllQuestions = useMemo(() => {
    return _.reject(answersValues, a => a === undefined).length === questions.length;
  }, [answersValues, questions]);

  return (
    <>
      <QuestionTitle>{questionTitle}</QuestionTitle>
      <div className="flex-column full-width align-center">
        {
          questions.map((question, qi) => (
            <div key={question.description} className="margin-top-ml">
              <h3>{question.questionLabel}</h3>
              <div className="margin-vertical-ml">{question.description}</div>
              <TextField
                type={TextField.types.NUMBER}
                placeholder={` ערך בין ${question.minValue} ל-${question.maxValue}`}
                value={answersValues[qi]?.toString() || ''}
                maxLength={3}
                onChange={(value) => {
                  const newAnswersValues = [...answersValues];
                  if (value !== '') {
                    newAnswersValues[qi] = parseInt(value);
                  } else {
                    delete newAnswersValues[qi];
                  }
                  setAnswersValues(newAnswersValues);
                }}
              />
            </div>
          ))
        }
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
