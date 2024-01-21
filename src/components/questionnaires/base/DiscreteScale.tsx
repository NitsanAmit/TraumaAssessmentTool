import { useMemo } from 'react';
import { observer } from 'mobx-react-lite';
import { QuestionnaireBaseProps } from './types';
import { PagedQuestions } from './PagedQuestions';

export type DiscreteScaleProps = QuestionnaireBaseProps & {
  threshold: number;
  questionTitle: string;
  questions: string[];
  answers: {
    label: string;
    value: number;
  }[];
}

export const DiscreteScale: React.FC<DiscreteScaleProps> = observer(({
                                                                       initialState,
                                                                       threshold,
                                                                       questions,
                                                                       answers,
                                                                       questionTitle,
                                                                       onNextClicked,
                                                                     }) => {
  const onNext = useMemo(() => {
    if (!onNextClicked) {
      return undefined;
    }
    return (answersValues: number[], forcePassthreshold: boolean = false) => {
      const score = answersValues.reduce((acc, curr) => acc + curr, 0);
      const didPassthreshold = score >= threshold || forcePassthreshold;
      onNextClicked?.(answersValues, didPassthreshold, score)
    }
  }, [onNextClicked, threshold]);

  return (
    <PagedQuestions key={questionTitle} questionTitle={questionTitle} questions={questions} answers={answers} onNext={onNext}
                    initialState={initialState as number[]} />
  );
});
