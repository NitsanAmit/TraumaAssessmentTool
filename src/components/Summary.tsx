import { Button } from '@fluentui/react-components';
import { SummaryTable } from './SummaryTable';
import { useEffect } from 'react';
import styled from 'styled-components';
import { ResultsStore } from '../store/ResultsStore';
import { QuestionnairesSummary } from '../store/types';
import { useFirebase } from './hooks/useFirebase';

export const Summary: React.FC<SummaryProps> = ({ resultsStore, personalDetailsSummary, sendAnonymousResults }) => {

  useEffect(() => {
    sendAnonymousResults && resultsStore.summary && sendAnonymousResults(resultsStore.summary);
  }, [resultsStore.summary, sendAnonymousResults]);

  const { logEvent } = useFirebase();
  useEffect(() => {
    logEvent('summary_page_visited', { resultCategory: resultsStore.secondStageResultCategory });
  }, [logEvent, resultsStore.secondStageResultCategory]);

  const exportToPdf = (withPersonalDetails: boolean) => {
    logEvent('export_to_pdf', { withPersonalDetails, resultCategory: resultsStore.secondStageResultCategory });
    resultsStore.exportToPdf(withPersonalDetails ? personalDetailsSummary : undefined);
  }

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
          {resultsStore.resultsVerbalSummary.summary}
          <h2>מה עכשיו?</h2>
          <StyledUl>
            {
              resultsStore.resultsVerbalSummary.actions.map((r, index) => (
                <li key={index}>{r}</li>
              ))
            }
          </StyledUl>

        </div>
      </StyledVerbalSummaryContainer>
      <Button appearance="primary" size="large" shape="circular" className="full-width"
              onClick={() => exportToPdf(true)}>
        שמור תוצאות כ-PDF
      </Button>
      <StyledButton appearance="primary" size="large" shape="circular" onClick={() => exportToPdf(false)}>
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
          box-sizing: border-box;
          padding: 24px;
          @media (max-width: 390px) {
            border-radius: 0;
            padding: 16px;
          }
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
    padding-inline-start: 24px;
  `,
  StyledVerbalSummaryContainer = styled.div`
    white-space: pre-wrap;
  `;
