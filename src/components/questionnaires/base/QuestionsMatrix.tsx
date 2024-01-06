import { observer } from 'mobx-react-lite';
import _ from 'lodash';
import { useState } from 'react';
import styled from 'styled-components';
import {
  Radio,
  Table,
  TableBody,
  TableCell,
  TableCellLayout,
  TableHeader,
  TableHeaderCell,
  TableRow
} from '@fluentui/react-components';
import { tableRowClassName } from '@fluentui/react-table';


export const QuestionsMatrix: React.FC<QuestionsMatrixProps> = observer(({
                                                                           initialState,
                                                                           questions,
                                                                           answers,
                                                                           onChange
                                                                         }) => {

  const [answersValues, setAnswersValues] = useState<number[]>(initialState ?? []);
  const onSelect = (question, value) => {
    const newAnswersValues = [...answersValues];
    newAnswersValues[questions.indexOf(question)] = value;
    setAnswersValues(newAnswersValues);
    onChange(newAnswersValues);
  };
  const maxAnswersValue = _.maxBy(answers, 'value')?.value;

  return (
    <StyledTable>
      <TableHeader>
        <TableRow key="header-row">
          <StyledTableHeader key="empty-corner-cell" columnsCount={answers.length}/>
          {
            answers.map(answer => <TableHeaderCell key={answer.label}>{answer.label}</TableHeaderCell>)
          }
        </TableRow>
      </TableHeader>
      <TableBody>
        {
          questions.map((question, qi) => {
            const isObject = typeof question !== 'string';
            const questionText = isObject ? question.text : question;
            return (
              <TableRow key={questionText}>
                <TableCell><TableCellLayout appearance="primary">{questionText}</TableCellLayout></TableCell>
                {
                  answers.map(answer => {
                    const value = isObject && question.reverseScore ? (maxAnswersValue - answer.value + 1) : answer.value;
                    return <TableCell key={value}>
                      <Radio
                        value={value.toString()}
                        checked={answersValues[qi] === value}
                        onChange={() => onSelect(question, value)}/>
                    </TableCell>;
                  })
                }
              </TableRow>
            );
          })
        }
      </TableBody>
    </StyledTable>
  );
});

export type QuestionsMatrixProps = {
  initialState?: number[];
  onChange: (answersValues: number[]) => void;
  questions: (string | { text: string; reverseScore: boolean })[];
  answers: {
    label: string;
    value: number;
  }[];
}

const StyledTable = styled(Table)`
          table-layout: fixed;
          .${tableRowClassName} {
            background: white;
          }
          @media (max-width: 480px) {
            font-size: 12px;
          }
  `,
  StyledTableHeader = styled(TableHeaderCell)<{ columnsCount: number }>`
    width: ${props => (100 / props.columnsCount) * 1.5}%;
    @media (max-width: 480px) {
      width: ${props => (100 / props.columnsCount) * 1.1}%;
    }
  `;
