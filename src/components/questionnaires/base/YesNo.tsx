import { useMemo, useState } from 'react';
import { observer } from 'mobx-react-lite';
import { QuestionsMatrix } from './QuestionsMatrix';
import { QuestionnaireBaseProps } from './types';
import { QuestionnaireBase } from './QuestionnaireBase';

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
  const [answersValues, setAnswerValues] = useState<number[]>(initialState as number[] ?? []);
  const completedAllQuestions = useMemo(() => answersValues.filter(a => a !== undefined).length === questions.length,
    [answersValues, questions]);

  const onNext = () => {
    const score = answersValues.reduce((acc, curr) => acc + curr, 0);
    const didPassScoreBar = score >= scoreBar;
    onNextClicked(answersValues, didPassScoreBar, score)
  }
  return (
    <QuestionnaireBase questionTitle={questionTitle} nextEnabled={completedAllQuestions} onNextClicked={onNext}>
      <QuestionsMatrix key={questionTitle} questions={questions} answers={answers}
                       onChange={setAnswerValues} initialState={initialState as number[]}/>
    </QuestionnaireBase>
  );
});
