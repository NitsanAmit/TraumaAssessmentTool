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
import { QuestionnaireNames, QuestionnaireTypes } from './questionnaires/base/types';
import { RangeSlider } from './RangeSlider';

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
                  !_.isNil(s.minScore) && !_.isNil(s.maxScore) && s.questionnaireType !== QuestionnaireTypes.TRUE_FALSE &&
                  <RangeSlider score={s.score} threshold={s.threshold} min={s.minScore} max={s.maxScore}/>
                }
                {
                  s.questionnaireType === QuestionnaireTypes.TRUE_FALSE &&
                  <div>{s.score === 0 ? 'לא' : 'כן'}</div>
                }
                {
                  s.questionnaireType === QuestionnaireTypes.FREE_TEXT &&
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

const QUESTIONNAIRE_NAME_TO_PURPOSE: { [key: string]: string } = {
  [QuestionnaireNames.CGI]: 'מצוקה כללית',
  [QuestionnaireNames.GAD_2]: 'שאלון חרדה (קצר)',
  [QuestionnaireNames.PHQ_2]: 'שאלון דיכאון (קצר)',
  [QuestionnaireNames.K5]: 'מצוקה כללית',
  [QuestionnaireNames.PC_PTSD_5]: 'סימני PTSD (קצר)',
  [QuestionnaireNames.CSE_T]: 'התמודדות',
  [QuestionnaireNames.Dissociation]: 'דיסוציאציה',
  [QuestionnaireNames.Derealization]: 'דיסוציאציה',
  [QuestionnaireNames.SAST]: 'מתח וחרדה',
  [QuestionnaireNames.PCL_5]: 'סימני PTSD (מלא)',
  [QuestionnaireNames.STO]: 'תפיסה אישית של טראומה',
  [QuestionnaireNames.GAD_7]: 'שאלון חרדה (מלא)',
  [QuestionnaireNames.PHQ_9]: 'שאלון דיכאון (מלא)',
  [QuestionnaireNames.ICG]: 'אובדן ושכול',
  [QuestionnaireNames.WANT_HELP]: 'מצוקה כללית',
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
