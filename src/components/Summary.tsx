import { Button } from '@fluentui/react-components';
import { SummaryTable } from './SummaryTable';
import { useEffect } from 'react';
import styled from 'styled-components';
import { ResultsStore } from '../store/ResultsStore';
import { QuestionnairesSummary, SECOND_STAGE_RESULT_CATEGORY } from '../store/types';

export const Summary: React.FC<SummaryProps> = ({ resultsStore, personalDetailsSummary, sendAnonymousResults }) => {

  useEffect(() => {
    sendAnonymousResults && resultsStore.summary && sendAnonymousResults(resultsStore.summary);
  }, [resultsStore.summary, sendAnonymousResults]);

  return (
    <StyledSummaryContainer className="full-height flex-column space-between full-width">
      {
        resultsStore.resultsElements &&
        <h2 className="margin-vertical-sm">
          בדקנו איתך רמות של {resultsStore.resultsElements}, והתוצאות הן:
        </h2>
      }
      <div className="margin-bottom-ml overflow-x">
        <SummaryTable questionnairesSummary={resultsStore.rangedSummary}/>
      </div>
      <StyledVerbalSummaryContainer>
        <h2>סיכום והמלצות:</h2>
        {
          resultsStore.resultsSymptoms?.length &&
          <>
            <span className="semi-bold">
            כפי שניתן לראות בטבלה דיווחת על רמות מצוקה גבוהות בכמה אזורים, ובהם:
            </span>
            <StyledUl>
              {
                resultsStore.resultsSymptoms.map((s, index) => (
                  <li key={index}>{s}</li>
                ))
              }
            </StyledUl>
          </>
        }
        <div className="margin-bottom-xl margin-top-m">
          {resultsStore.resultsVerbalSummary}
          {
            resultsStore.secondStageResultCategory === SECOND_STAGE_RESULT_CATEGORY.POSITIVE
              ? ' כדאי לשמור את התוצאות בדף זה ולהשתמש בהן כדי לעזור בפנייתך.'
              : ' באפשרותך להדפיס את התוצאות ולהציגן למטפל/ת שתבחרי או לרופא/ת המשפחה, כדי לקבל עזרה או לקבל המלצות לטיפול נוסף.'
          }
        </div>
      </StyledVerbalSummaryContainer>
      <Button appearance="primary" size="large" shape="circular" className="full-width"
              onClick={() => resultsStore.exportToPdf(personalDetailsSummary)}>
        שמור תוצאות כ-PDF
      </Button>
      <StyledButton appearance="primary" size="large" shape="circular" onClick={() => resultsStore.exportToPdf()}>
        שמור ללא פרטים מזהים
      </StyledButton>
    </StyledSummaryContainer>
  );
}

export type SummaryProps = {
  resultsStore: ResultsStore;
  personalDetailsSummary: Record<string, string | undefined>;
  sendAnonymousResults?: (questionnaireResults: QuestionnairesSummary) => void;
}

const StyledSummaryContainer = styled.div`
  font-size: 16px;
  line-height: 24px;
  `,
  StyledButton = styled(Button)`
          margin-top: 16px;
          width: 100%;
          background-color: #9196e3;
          &:hover {
            background-color: #8085cb;
          }
  `,
  StyledUl = styled.ul`
    margin-top: 8px;
    margin-bottom: 8px;
    padding-inline-start: 16px;
  `,
  StyledVerbalSummaryContainer = styled.div`
    white-space: pre-wrap;
  `;
