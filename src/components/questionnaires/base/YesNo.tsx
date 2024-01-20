import { useMemo } from 'react';
import { observer } from 'mobx-react-lite';
import { QuestionnaireBaseProps } from './types';
import { PagedQuestionsMatrix } from './PagedQuestionsMatrix';

export type YesNoProps = QuestionnaireBaseProps & {
  scoreBar: number;
  questionTitle: string;
  questions: string[];
}

const answers = [
  { label: 'לא', value: 0 },
  { label: 'כן', value: 1 },
];

export const YesNo: React.FC<YesNoProps> = observer(({
                                                       initialState,
                                                       scoreBar,
                                                       questions,
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
      onNextClicked(answersValues, didPassScoreBar, score);
    }
  }, [onNextClicked, scoreBar]);

  return (
    <PagedQuestionsMatrix questionTitle={questionTitle} questions={questions} answers={answers} onNext={onNext}
                          initialState={initialState as number[]} />
  );
});
