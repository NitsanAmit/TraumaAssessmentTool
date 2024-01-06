import {
  Table,
  TableBody,
  TableCell,
  TableCellLayout,
  TableHeader,
  TableHeaderCell,
  TableRow
} from '@fluentui/react-components';
import styled from 'styled-components';
import { tableRowClassName } from '@fluentui/react-table';
import { QuestionnairesSummary } from '../store/types';

export const SummaryTable: React.FC<SummaryTableProps> = ({ questionnairesSummary }) => {
  return (
    <StyledTable>
      <TableHeader>
        <TableRow>
          <TableHeaderCell><TableCellLayout appearance="primary">שאלון</TableCellLayout></TableHeaderCell>
          <TableHeaderCell><TableCellLayout appearance="primary">תוצאה</TableCellLayout></TableHeaderCell>
        </TableRow>
      </TableHeader>
      <TableBody>
        {
          questionnairesSummary.map(s => (
            <TableRow>
              <TableCell>
                {s.questionnaireName}
              </TableCell>
              <TableCell>
                {
                  s.questionnaireName === 'צורך/רצון בעזרה מקצועית' ?
                    (s.score > 0 ? 'כן' : 'לא')
                    : s.score
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
  .${tableRowClassName} {
    background: white;
  }
  @media (max-width: 480px) {
    font-size: 12px;
  }
`;
