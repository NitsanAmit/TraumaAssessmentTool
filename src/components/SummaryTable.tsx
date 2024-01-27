import {
  Table,
  TableBody,
  TableCell,
  TableCellLayout,
  TableHeader,
  TableHeaderCell,
  TableRow,
} from '@fluentui/react-components';
import _ from 'lodash';
import styled from 'styled-components';
import { tableRowClassName } from '@fluentui/react-table';
import { QuestionnairesSummary } from '../store/types';
import { RangeSlider } from './RangeSlider';
import { QUESTIONNAIRE_NAME_TO_PURPOSE, QuestionnaireTypes } from '../data/data.consts';

export const SummaryTable: React.FC<SummaryTableProps> = ({ questionnairesSummary }) => {

  return (
    <StyledTable size="small">
      <TableHeader>
        <TableRow>
          <StyledTableHeaderCell colWidth={120}><TableCellLayout
            appearance="primary">שאלון</TableCellLayout></StyledTableHeaderCell>
          <StyledTableHeaderCell colWidth={120}><TableCellLayout appearance="primary">מה
            נבדק</TableCellLayout></StyledTableHeaderCell>
          <StyledTableHeaderCell colWidth={80}><TableCellLayout
            appearance="primary">טווח תקין</TableCellLayout></StyledTableHeaderCell>
          <StyledTableHeaderCell><TableCellLayout appearance="primary">התוצאה שלי</TableCellLayout></StyledTableHeaderCell>
        </TableRow>
      </TableHeader>
      <TableBody>
        {
          questionnairesSummary.map((s, index) => (
            <TableRow key={index}>
              <TableCell>
                {s.questionnaireName}
              </TableCell>
              <TableCell>
                {QUESTIONNAIRE_NAME_TO_PURPOSE[s.questionnaireName]}
              </TableCell>
              <TableCell>
                {
                  !_.isNil(s.minScore) && !_.isNil(s.threshold) && s.questionnaireType !== QuestionnaireTypes.TRUE_FALSE &&
                  `${s.minScore} - ${s.threshold - 1}`
                }
              </TableCell>
              <TableCell>
                {
                  !_.isNil(s.minScore) && !_.isNil(s.maxScore) && typeof s.score === 'number' &&
                  <RangeSlider score={s.score} threshold={s.threshold} min={s.minScore} max={s.maxScore}/>
                }
                {
                  (s.questionnaireType === QuestionnaireTypes.TRUE_FALSE
                  || s.questionnaireType === QuestionnaireTypes.FREE_TEXT) &&
                  <div>{s.score}</div>
                }
              </TableCell>
            </TableRow>
          ))
        }
      </TableBody>
    </StyledTable>
  );
}

export type SummaryTableProps = {
  questionnairesSummary: QuestionnairesSummary;
}

const StyledTable = styled(Table)`
          table-layout: fixed;
          width: 100%;
          min-width: 500px;
          font-size: 14px;
          background-color: #fafafa;
          border-radius: 8px;
          .${tableRowClassName}:hover {
            background: inherit;
          }
          @media (max-width: 480px) {
            font-size: 12px;
          }
          tbody tr:last-child {
            border-bottom: none;
          }
  `,
  StyledTableHeaderCell = styled(TableHeaderCell)<{ colWidth?: number }>`
    width: ${({ colWidth }) => colWidth ? `${colWidth}px` : undefined};
    font-size: 16px;
    @media (max-width: 480px) {
      width: ${({ colWidth }) => colWidth ? `${colWidth * (0.7)}px` : undefined};
    }
  `;
