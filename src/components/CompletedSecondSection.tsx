import { observer } from 'mobx-react-lite';
import styled from 'styled-components';
import { ResultsStore } from '../store/ResultsStore';
import { SECOND_STAGE_RESULT_CATEGORY } from '../store/types';
import { useFirebase } from './hooks/useFirebase';
import { useEffect } from 'react';
import { StickyBottomButtonPage } from './StickyButtonPage';

export const CompletedSecondSection: React.FC<CompletedSecondSectionProps> = observer(({
                                                                                         resultsStore,
                                                                                         onNextClicked
                                                                                       }) => {

  const { logEvent } = useFirebase();
  useEffect(() => {
    logEvent('second_section_completed', { resultCategory: resultsStore.secondStageResultCategory });
  }, [logEvent, resultsStore.secondStageResultCategory]);

  return (
    <StickyBottomButtonPage buttonText={'לתוצאות שלי'} onButtonClick={onNextClicked}>
      <Container>
        <StyledImage src="/summary.png"/>
        <h1 className="margin-bottom-xxs">זהו, סיימנו!</h1>
        <StyledText className="margin-bottom-xl">
          <p>
            {
              'תודה רבה על שהשלמת את שני החלקים של השאלון.\n'
            }
          </p>
          <p>
              <span className="semi-bold">
                {
                  resultsStore.secondStageResultCategory === SECOND_STAGE_RESULT_CATEGORY.NEGATIVE &&
                  'בהתחשב באירועים שעברת, תגובותיך היום אינן חריגות ואינן מסכנות את בריאותך הנפשית.\n'
                }
                {
                  resultsStore.secondStageResultCategory === SECOND_STAGE_RESULT_CATEGORY.SLIGHTLY_POSITIVE &&
                  'בהתחשב באירועים שעברת, יש חשיבות לתת תשומת לב לחלק מהתגובות שלך ולפעול בהתאם.\n'
                }
                {
                  resultsStore.secondStageResultCategory === SECOND_STAGE_RESULT_CATEGORY.POSITIVE &&
                  'בהתחשב באירועים שעברת, התגובות שלך מחייבות תשומת לב ופעולה מצידך.\n'
                }
              </span>
            אחרי לחיצה על כפתור "לתוצאות שלי", נציג לך את סיכום השאלונים המלא עם המלצות שיתאימו אישית למצבך.
          </p>
        </StyledText>
      </Container>
    </StickyBottomButtonPage>
  );
});

export type CompletedSecondSectionProps = {
  resultsStore: ResultsStore;
  onNextClicked: () => void;
}

const Container = styled.div`
          display: flex;
          flex-direction: column;
          align-items: center;
          text-align: center;
          flex: 1;
          width: 100%;
  `,
  StyledImage = styled.img`
    width: 70%;
    max-width: 350px;
    margin-bottom: 48px;
    @media (max-width: 390px) {
      width: 80%;
      margin-bottom: 16px;
    }
  `,
  StyledText = styled.div`
    white-space: pre-wrap;
  `;

