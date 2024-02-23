import _ from 'lodash';
import { observer } from 'mobx-react-lite';
import {
  Radio, RadioGroup, RadioGroupOnChangeData,
} from '@fluentui/react-components';
import { useState } from 'react';


export const PagedQuestion: React.FC<PagedQuestionProps> = observer(({
                                                                                   initialState,
                                                                                   question,
                                                                                   answers,
                                                                                   onChange,
                                                                                 }) => {
  const [checkedAnswer, setCheckedAnswer] = useState<number | undefined >(initialState);
  const onSelectionChanged = (_, { value }: RadioGroupOnChangeData) => {
    const intValue = parseInt(value);
    setCheckedAnswer(intValue);
    onChange(intValue);
  };
  const isObject = typeof question !== 'string';
  const questionText = isObject ? question.text : question;
  const maxAnswersValue = _.maxBy(answers, 'value')?.value;
  const orderedAnswers = isObject && question.reverseScore ? _.orderBy(answers, 'value', 'desc') : answers;

  return (
    <div className="flex-column full-width margin-bottom-xl">
      <h3 className="full-width align-text-center padding-horizontal-sm border-box">{questionText}</h3>
      {
        isObject && question.reverseScore &&
        <div className="margin-bottom-sm full-width align-text-center">* שימ/י לב שסדר התשובות בשאלה זו הפוך</div>
      }
      <RadioGroup onChange={onSelectionChanged}>
        {
          orderedAnswers.map(answer => {
            const value = isObject && question.reverseScore ? (maxAnswersValue - answer.value + 1) : answer.value;
            return <Radio key={value} label={answer.label} value={value.toString()} checked={checkedAnswer === value}/>;
          })
        }
      </RadioGroup>
    </div>
  );
});

export type PagedQuestionProps = {
  initialState?: number;
  onChange: (answersValues: number) => void;
  question: string | { text: string; reverseScore?: boolean, forcePassthreshold?: number };
  answers: {
    label: string;
    value: number;
  }[];
}
