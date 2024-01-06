import { useMemo, useState } from 'react';
import { observer } from 'mobx-react-lite';
import _ from 'lodash';
import { Input } from '@fluentui/react-components';
import { QuestionnaireBaseProps } from './types';
import { QuestionnaireBase } from './QuestionnaireBase';
import styled from 'styled-components';

export type FreeNumericProps = QuestionnaireBaseProps & {
  scoreBar: number;
  questionTitle: string;
  questions: {
    description: string;
    questionLabel: string;
    minValue: number;
    maxValue: number;
  }[];
}

export const FreeNumeric: React.FC<FreeNumericProps> = observer(({
                                                                   initialState,
                                                                   scoreBar,
                                                                   questions,
                                                                   questionTitle,
                                                                   onNextClicked,
                                                                 }) => {

  const [answersValues, setAnswersValues] = useState<number[]>(initialState as number[] ?? []);
  const score = useMemo(() => answersValues.reduce((acc, curr) => acc + curr, 0), [answersValues]);
  const didPassScoreBar = useMemo(() => score >= scoreBar, [score, scoreBar]);
  const completedAllQuestions = useMemo(() => {
    return _.reject(answersValues, a => a === undefined).length === questions.length;
  }, [answersValues, questions]);
  const onNext = useMemo(() => onNextClicked ? () => onNextClicked(answersValues, didPassScoreBar, score) : undefined,
    [onNextClicked, answersValues, didPassScoreBar, score]);

  return (
    <QuestionnaireBase nextEnabled={completedAllQuestions} onNextClicked={onNext}>
      <QuestionsContainer>
      {
        questions.map((question, qi) => (
          <div key={question.description}>
            <h2>{question.questionLabel}</h2>
            <div className="margin-vertical-ml">{question.description}</div>
            <Input
              type="number"
              placeholder={` ערך בין ${question.minValue} ל-${question.maxValue}`}
              value={answersValues[qi]?.toString() || ''}
              onChange={(_, { value }) => {
                if (parseInt(value) < 0) {
                  return;
                }
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
      </QuestionsContainer>
    </QuestionnaireBase>
  );
});

const QuestionsContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  row-gap: 32px;
`;
