import { Button } from '@fluentui/react-components';
import { SummaryTable } from './SummaryTable';
import { useEffect } from 'react';
import styled from 'styled-components';
import { ResultsStore } from '../store/ResultsStore';
import { QuestionnairesSummary } from '../store/types';
import { useFirebase } from './hooks/useFirebase';
import { useDebugMode } from './hooks/useDebugMode';
import { DebugResults } from './DebugResults';
import { mobile, smallDesktop } from './styles/style.consts';

export const Summary: React.FC<SummaryProps> = ({ resultsStore, personalDetailsSummary, sendAnonymousResults }) => {

  const debugMode = useDebugMode();
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
    <StyledSummaryContainer>
      {
        debugMode &&
        <DebugResults resultsSummary={resultsStore.rangedSummary} personalDetailsSummary={personalDetailsSummary}/>
      }
      <h1 className="margin-vertical-sm">תוצאות השאלונים:</h1>
      {
        resultsStore.resultsElements &&
        <div className="margin-bottom-ml">{` בדקנו איתך רמות של ${resultsStore.resultsElements}.`}</div>
      }
      <SummaryTableContainer className="margin-bottom-ml overflow-x">
        <SummaryTable questionnairesSummary={resultsStore.rangedSummary}/>
      </SummaryTableContainer>
      <StyledVerbalSummaryContainer>
        <h1>סיכום והמלצות:</h1>
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
          {
            resultsStore.phq9SuicidalPositive &&
            <div className="margin-vertical-ml">
              <div>
              <span className="bold">דיווחת כי לעיתים את/ה חושב/ת שהיה עדיף לו היית מת/ה או שחשב/ת לפגוע בעצמך. </span>
              מחשבות אלו קשורות לא פעם לכאב נפשי ולתחושת בדידות, ואין סיבה להישאר עם זה לבד. יש דרכים רבות לסייע לך להרגיש אחרת.
              </div>
              <div>
               <span className="bold">חשוב לפנות עוד היום לקבלת סיוע ראשוני. </span>
                האפשרויות העומדות לרשותך מפורטות כאן למטה. בנוסף, עמותת סה"ר מציעה <a href="https://ask-s.co.il/">שאלון מקוון</a> ייעודי שיעזור לך להבין את המצב שלך ולקבל עזרה מקצועית.
              </div>
            </div>
          }
          <h1>מה עכשיו?</h1>
          <StyledUl>
            {
              resultsStore.resultsVerbalSummary.actions.map((r, index) => {
                const containsLink = r.includes('http');
                if (containsLink) {
                  const linkRegex = /http[s]?:\/\/[^\s]+/g;
                  const link = r.match(linkRegex)?.[0];
                  const textParts = r.split(linkRegex);
                  return (
                    <li key={index}>
                      {textParts[0]}
                      <a href={link} target="_blank" rel="noreferrer">{link}</a>
                      {textParts[1]}
                    </li>
                  );
                }
                return (
                  <li key={index}>{r}</li>
                );
              })
            }
          </StyledUl>
        </div>
      </StyledVerbalSummaryContainer>
      <StyledButtonsContainer>
        <StyledSaveButton appearance="primary" size="large" shape="circular" className="full-width"
                onClick={() => exportToPdf(true)}>
          שמור תוצאות כ-PDF
        </StyledSaveButton>
        <StyledButton appearance="primary" size="large" shape="circular" onClick={() => exportToPdf(false)}>
          שמור ללא פרטים מזהים
        </StyledButton>
      </StyledButtonsContainer>
    </StyledSummaryContainer>
  );
}

export type SummaryProps = {
  resultsStore: ResultsStore;
  personalDetailsSummary: Record<string, string | undefined>;
  sendAnonymousResults?: (questionnaireResults: QuestionnairesSummary) => void;
}

const StyledSummaryContainer = styled.div`
          display: flex;
          flex-direction: column;
          flex: 1;
          font-size: 16px;
          line-height: 24px;
          box-sizing: border-box;
          padding: 32px;
          @media (max-width: ${smallDesktop.max}) {
            padding: 24px;
          }
          @media (max-width: ${mobile.max}) {
            border-radius: 0;
            padding: 16px;
          }
  `,
  SummaryTableContainer = styled.div`
    max-width: ${smallDesktop.max};
  `,
  StyledButtonsContainer = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 100%;
  `,
  StyledSaveButton = styled(Button)`
    padding: 8px;
    max-width: ${mobile.min};
  `,
  StyledButton = styled(StyledSaveButton)`
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
