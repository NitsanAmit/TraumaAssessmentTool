import {
  Button,
  makeStyles,
  Table,
  TableBody,
  TableCell,
  TableCellLayout,
  TableHeader,
  TableHeaderCell,
  TableRow
} from '@fluentui/react-components';
import { ApplicationStateStore } from '../store/ApplicationStateStore';
import styled from 'styled-components';
import { tableRowClassName } from '@fluentui/react-table';

export const Summary: React.FC<SummaryProps> = ({ appStateStore }) => {
  const styles = useStyles();
  return (
    <div className="full-height flex-column space-between full-width">
      <div className="flex-column full-width margin-bottom-xl">
        <h2 className="flex-column align-center">סיכום תוצאות השאלונים</h2>
        <StyledTable>
          <TableHeader>
            <TableRow>
              <TableHeaderCell><TableCellLayout appearance="primary">שאלון</TableCellLayout></TableHeaderCell>
              <TableHeaderCell><TableCellLayout appearance="primary">תוצאה</TableCellLayout></TableHeaderCell>
            </TableRow>
          </TableHeader>
          <TableBody>
            {
              appStateStore.questionnairesStore.summary.map(s => (
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
      </div>
      <Button appearance="primary" size="large" className="full-width" onClick={() => appStateStore.exportToPdf()}>
        שמור תוצאות כ-PDF
      </Button>
      <Button appearance="primary" size="large" className={styles.noIdButton}
              onClick={() => appStateStore.exportToPdf()}>
        שמור ללא פרטים מזהים
      </Button>
    </div>
  );
}

export type SummaryProps = {
  appStateStore: ApplicationStateStore;
}

const useStyles = makeStyles({
  noIdButton: {
    marginTop: '16px',
    width: '100%',
    backgroundColor: '#77a8ff',
    '&:hover': {
      backgroundColor: '#679fff',
    },
  }
});

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

