import { useMemo, useState } from 'react';
import { observer } from 'mobx-react-lite';
import _ from 'lodash';
import { Textarea } from '@fluentui/react-components';
import { QuestionnaireBaseProps } from './types';
import { QuestionnaireBase } from './QuestionnaireBase';

export type FreeTextProps = QuestionnaireBaseProps & {
  questions: string[];
}

export const FreeText: React.FC<FreeTextProps> = observer(({ initialState, questions, onNextClicked }) => {

  const [answer, setAnswer] = useState<string>(initialState as string ?? '');
  const onNext = useMemo(() => onNextClicked ? () => onNextClicked(answer, !_.isEmpty(answer), answer) : undefined, [onNextClicked, answer]);

  return (
    <QuestionnaireBase nextEnabled onNextClicked={onNext}>
      {
        questions.map(question => (
          <div className="full-width flex-column" key={question}>
            <h2>{question}</h2>
            <Textarea className="full-width"
                      placeholder="הקלד/י תשובך כאן"
                      value={answer} onChange={(_, { value }) => setAnswer(value)}/>
          </div>
        ))
      }
    </QuestionnaireBase>
  );
});
