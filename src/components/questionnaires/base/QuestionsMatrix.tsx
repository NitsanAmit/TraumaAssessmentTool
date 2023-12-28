import { observer } from 'mobx-react-lite';
import { useState } from 'react';
import { RadioButton } from 'monday-ui-react-core';


export const QuestionsMatrix: React.FC<QuestionsMatrixProps> = observer(({ questions, answers, onChange }) => {

  const [answersValues, setAnswersValues] = useState<number[]>([]);
  const onSelect = (question, answer) => {
    const newAnswersValues = [...answersValues];
    newAnswersValues[questions.indexOf(question)] = answer.value;
    setAnswersValues(newAnswersValues);
    onChange(newAnswersValues);
  };

  return (
    <table className="full-width" style={{ tableLayout: 'fixed'}}>
      <thead>
      <tr>
        <th style={{width: '40%'}}></th>
        {
          answers.map(answer => <th key={answer.label}>{answer.label}</th>)
        }
      </tr>
      </thead>
      <tbody>
      {
        questions.map((question, qi) => (
          <tr key={question}>
            <td>{question}</td>
            {
              answers.map(answer =>
                <td key={answer.value}>
                  <RadioButton
                    value={answer.value.toString()} text=""
                    checked={answersValues[qi] === answer.value} onSelect={() => onSelect(question, answer)}/>
                </td>)
            }
          </tr>
        ))
      }
      </tbody>
    </table>
  );
});

export type QuestionsMatrixProps = {
  onChange: (answersValues: number[]) => void;
  questions: string[];
  answers: {
    label: string;
    value: number;
  }[];
}
