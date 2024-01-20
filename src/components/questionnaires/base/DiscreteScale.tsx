import { useMemo } from 'react';
import { observer } from 'mobx-react-lite';
import { QuestionnaireBaseProps } from './types';
import { PagedQuestionsMatrix } from './PagedQuestionsMatrix';

export type DiscreteScaleProps = QuestionnaireBaseProps & {
  scoreBar: number;
  questionTitle: string;
  questions: string[];
  answers: {
    label: string;
    value: number;
  }[];
}

export const DiscreteScale: React.FC<DiscreteScaleProps> = observer(({
                                                                       initialState,
                                                                       scoreBar,
                                                                       questions,
                                                                       answers,
                                                                       questionTitle,
                                                                       onNextClicked,
                                                                     }) => {
  const onNext = useMemo(() => {
    if (!onNextClicked) {
      return undefined;
    }
    return (answersValues: number[]) => {
      const score = answersValues.reduce((acc, curr) => acc + curr, 0);
      const didPassScoreBar = score >= scoreBar;
      onNextClicked?.(answersValues, didPassScoreBar, score)
    }
  }, [onNextClicked, scoreBar]);

  return (
    <PagedQuestionsMatrix key={questionTitle} questionTitle={questionTitle} questions={questions} answers={answers} onNext={onNext}
                          initialState={initialState as number[]} />
  );
});
