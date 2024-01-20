import { observer } from 'mobx-react-lite';
import _ from 'lodash';
import { QuestionnaireBaseProps } from './types';
import { DiscreteScaleProps } from './DiscreteScale';
import { useCallback, useState } from 'react';
import { PagedQuestionsMatrix } from './PagedQuestionsMatrix';

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

  const [allQuestionnaireAnswers, setAllQuestionnaireAnswers] = useState<(number[])[]>(initialState as number[][] ?? []);
  const [currentQuestionnaireIndex, setCurrentQuestionnaireIndex] = useState<number>(0);

  const onQuestionnaireNext = useCallback((index: number, values: number[]) => {
    const newAnswersValues = [...allQuestionnaireAnswers];
    newAnswersValues[index] = values;
    setAllQuestionnaireAnswers(newAnswersValues);
    if (index === questionnaires.length - 1) {
      const scores = _.map(allQuestionnaireAnswers, a => _.sum(a));
      const questionnairesThatPassedScoreBar = _.filter(questionnaires, (q, i) => scores[i] >= q.scoreBar).length;
      onNextClicked?.(allQuestionnaireAnswers, questionnairesThatPassedScoreBar >= scoreBar, scores);
    } else {
      setCurrentQuestionnaireIndex(index + 1);
    }
  }, [allQuestionnaireAnswers, onNextClicked, questionnaires, scoreBar]);

  return (
    <PagedQuestionsMatrix key={currentQuestionnaireIndex} {...questionnaires[currentQuestionnaireIndex]}
                          onNext={(answers) => onQuestionnaireNext(currentQuestionnaireIndex, answers)}
                          initialState={(initialState as number[][])?.[currentQuestionnaireIndex]}/>
  );
});
