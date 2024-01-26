import { observer } from 'mobx-react-lite';
import styled from 'styled-components';
import { Button } from '@fluentui/react-components';
import { ChevronLeft16Regular } from '@fluentui/react-icons/lib/fonts';
import { ResultsStore } from '../store/ResultsStore';
import { SECOND_STAGE_RESULT_CATEGORY } from '../store/types';

export const CompletedSecondSection: React.FC<CompletedSecondSectionProps> = observer(({
                                                                                         resultsStore,
                                                                                         onNextClicked
                                                                                       }) => {

  return (
    <Container>
      <div>
        <StyledImage src="/summary.png"/>
        <h1 className="margin-bottom-xxs">זהו, סיימנו!</h1>
        <StyledText className="margin-bottom-xl">
          <p>
            {
              'תודה רבה על שהשלמת את שני החלקים של השאלון.\n'
            }
          </p>
          <p>
            {
              resultsStore.secondStageResultCategory === SECOND_STAGE_RESULT_CATEGORY.NEGATIVE &&
              <>
                <span className="semi-bold">{'בהתחשב באירועים שעברת, תגובותיך היום אינן חריגות ואינן מסכנות את בריאותך הנפשית.\n'}</span>
                כדאי לחזור על ההערכה הזו בעוד שבועיים כדי לבדוק שמצבך יציב. אחרי לחיצה על כפתור "לתוצאות שלי", נציג לך את סיכום השאלונים המלא עם המלצות שהתאימו אישית למצבך.
              </>
            }
            {
              resultsStore.secondStageResultCategory === SECOND_STAGE_RESULT_CATEGORY.SLIGHTLY_POSITIVE &&
              <>
                <span className="semi-bold">{'בהתחשב באירועים שעברת, יש חשיבות לתת תשומת לב לחלק מהתגובות שלך ולפעול בהתאם.\n'}</span>
                כדאי לחזור על ההערכה הזו בעוד שבועיים כדי לבדוק אם ישנם שינויים. אחרי לחיצה על כפתור "לתוצאות שלי", נציג לך את סיכום השאלונים המלא עם המלצות שהתאימו אישית למצבך.
              </>
            }
            {
              resultsStore.secondStageResultCategory === SECOND_STAGE_RESULT_CATEGORY.POSITIVE &&
              <>
                <span className="semi-bold">{'בהתחשב באירועים שעברת, התגובות שלך מחייבות תשומת לב ופעולה מצידך.\n'}</span>
                אחרי לחיצה על כפתור "לתוצאות שלי", נציג לך את סיכום השאלונים המלא עם המלצות שהתאימו אישית למצבך.
              </>
            }
          </p>
        </StyledText>
      </div>
      <Button
        size="large"
        appearance="primary"
        className="full-width"
        icon={<ChevronLeft16Regular/>}
        iconPosition="after"
        shape="circular"
        onClick={onNextClicked}>
        לתוצאות שלי
      </Button>
    </Container>
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
          justify-content: space-between;
          flex: 1;
  `,
  StyledImage = styled.img`
    width: 70%;
    max-width: 350px;
    margin-bottom: 48px;
    @media (max-width: 390px) {
      width: 80%;
      margin-bottom: 8px;
    }
  `,
  StyledText = styled.div`
    white-space: pre-wrap;
  `;

