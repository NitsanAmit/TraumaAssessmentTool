import { Button } from '@fluentui/react-components';
import { SummaryTable } from './SummaryTable';
import { useEffect, useMemo } from 'react';
import styled from 'styled-components';
import { ResultsStore } from '../store/ResultsStore';
import { QuestionnairesSummary } from '../store/types';

export const Summary: React.FC<SummaryProps> = ({ resultsStore, personalDetailsSummary, sendAnonymousResults }) => {

  useEffect(() => {
    sendAnonymousResults && resultsStore.summary && sendAnonymousResults(resultsStore.summary);
  }, [resultsStore.summary, sendAnonymousResults]);

  const elementsString = useMemo(() => {
    if (resultsStore.resultsElements?.length === 0) {
      return null;
    }
    if (resultsStore.resultsElements.length === 1) {
      return resultsStore.resultsElements[0];
    }
    return resultsStore.resultsElements.slice(0, resultsStore.resultsElements.length - 1)
      .join(', ') + ' ו' + resultsStore.resultsElements.slice(-1).pop();
  }, [resultsStore.resultsElements]);

  return (
    <StyledSummaryContainer className="full-height flex-column space-between full-width">
      {
        elementsString &&
        <h2 className="margin-vertical-sm">
          בדקנו איתך רמות של {elementsString}, והתוצאות הן:
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
