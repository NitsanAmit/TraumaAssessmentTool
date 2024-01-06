import { observer } from 'mobx-react-lite';
import _ from 'lodash';
import { QuestionnaireBaseProps } from './types';
import { QuestionsMatrix } from './QuestionsMatrix';
import { DiscreteScaleProps } from './DiscreteScale';
import { useCallback, useMemo, useState } from 'react';
import { QuestionnaireBase } from './QuestionnaireBase';
import styled from 'styled-components';

export type MultiDiscreteScaleProps = QuestionnaireBaseProps & {
  scoreBar: number;
  questionnaires: DiscreteScaleProps[];
}

export const MultiDiscreteScale: React.FC<MultiDiscreteScaleProps> = observer(({
                                                                                     onNextClicked,
                                                                                     initialState,
                                                                                     scoreBar,
                                                                                     questionnaires,
                                                                                   }) => {

  const [answersValues, setAnswerValues] = useState<(number[])[]>(initialState as number[][] ?? []);

  const onChange = useCallback((index: number, values: number[]) => {
    const newAnswersValues = [...answersValues];
    newAnswersValues[index] = values;
    setAnswerValues(newAnswersValues);
  }, [answersValues]);

  const completedAllQuestions = useMemo(() => {
      return answersValues.length === questionnaires.length
        && answersValues.every((questionnaireAnswers, index) => questionnaireAnswers.filter(v => v !== undefined).length === questionnaires[index].questions.length);
    },
    [answersValues, questionnaires]);

  const onNext = useMemo(() => {
    if (!onNextClicked) {
      return undefined;
    }
    return () => {
      const scores = _.map(answersValues, (a, i) => _.sum(a));
      const questionnairesThatPassedScoreBar = _.filter(questionnaires, (q, i) => scores[i] >= q.scoreBar).length;
      onNextClicked?.(answersValues, questionnairesThatPassedScoreBar >= scoreBar, scores);
    }
  }, [onNextClicked, answersValues, questionnaires, scoreBar]);

  return (
    <QuestionnaireBase nextEnabled={completedAllQuestions} onNextClicked={onNext}>
      <QuestionnairesContainer>
      {
        questionnaires.map((questionnaire, index) => {
            return (
              <>
                {
                  questionnaire.questionTitle &&
                  <QuestionTitle>{questionnaire.questionTitle}</QuestionTitle>
                }
                <QuestionsMatrix
                  key={index}
                  questions={questionnaire.questions}
                  answers={questionnaire.answers}
                  onChange={(values) => onChange(index, values)}
                  initialState={(initialState as number [][])?.[index]}/>
              </>
            );
          }
        )
      }
      </QuestionnairesContainer>
    </QuestionnaireBase>
  );
});

const QuestionnairesContainer = styled.div`
          display: flex;
          flex-direction: column;
          row-gap: 24px;
  `,
  QuestionTitle = styled.h2`
    text-align: center;
    white-space: pre-line;
  `;
