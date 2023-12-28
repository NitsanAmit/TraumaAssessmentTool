import { observer } from 'mobx-react-lite';
import { useState } from 'react';
import { RadioButton } from 'monday-ui-react-core';
import styled from 'styled-components';


export const QuestionsMatrix: React.FC<QuestionsMatrixProps> = observer(({ questions, answers, onChange }) => {

  const [answersValues, setAnswersValues] = useState<number[]>([]);
  const onSelect = (question, answer) => {
    const newAnswersValues = [...answersValues];
    newAnswersValues[questions.indexOf(question)] = answer.value;
    setAnswersValues(newAnswersValues);
    onChange(newAnswersValues);
  };

  return (
    <StyledTable>
      <thead>
      <tr>
        <StyledTableHeader/>
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
    </StyledTable>
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

const StyledTable = styled.table`
          table-layout: fixed;
          width: 100%;
  `,
  StyledTableHeader = styled.th`
    width: 40%;
  `;
