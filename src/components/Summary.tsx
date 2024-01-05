import {
  Button,
  makeStyles,
} from '@fluentui/react-components';
import { ApplicationStateStore } from '../store/ApplicationStateStore';
import { SummaryTable } from './SummaryTable';

export const Summary: React.FC<SummaryProps> = ({ appStateStore }) => {
  const styles = useStyles();
  return (
    <div className="full-height flex-column space-between full-width">
      <div className="flex-column full-width margin-bottom-xl">
        <h2 className="flex-column align-center">סיכום תוצאות השאלונים</h2>
        <SummaryTable questionnairesSummary={appStateStore.questionnairesStore.summary}/>
      </div>
      <Button appearance="primary" size="large" className="full-width" onClick={() => appStateStore.exportToPdf(true)}>
        שמור תוצאות כ-PDF
      </Button>
      <Button appearance="primary" size="large" className={styles.noIdButton} onClick={() => appStateStore.exportToPdf(false)}>
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
