import { observer } from 'mobx-react-lite';
import styled from 'styled-components';
import { QuestionnairesStore } from '../store/QuestionnairesStore';
import { useEffect } from 'react';
import { useFirebase } from './hooks/useFirebase';
import { StickyBottomButtonPage } from './StickyButtonPage';
import { mobile } from './styles/style.consts';

export const SecondSectionIntro: React.FC<SecondSectionIntroProps> = observer(({ questionnairesStore }) => {

  const onPrimaryClicked = () => {
    if (questionnairesStore.requiresSecondSection) {
      logEvent('second_section_start', { voluntary: false });
      questionnairesStore.skippedSecondSection = false;
      questionnairesStore.nextQuestion(true, false, 0);
    } else {
      logEvent('second_section_skipped');
      questionnairesStore.skippedSecondSection = true;
      questionnairesStore.skipToSummary();
    }
  }

  const onSecondaryClicked = () => {
    logEvent('second_section_start', { voluntary: true });
    questionnairesStore.skippedSecondSection = false;
    questionnairesStore.nextQuestion(false, false, 0);
  }

  const { logEvent } = useFirebase();
  useEffect(() => {
    logEvent('second_section_intro_visited', { shouldProceed: questionnairesStore.requiresSecondSection });
  }, [logEvent, questionnairesStore.requiresSecondSection]);

  return (
    <StickyBottomButtonPage buttonText={questionnairesStore.requiresSecondSection ? 'התחלת חלק ב' : 'סיום האבחון'}
                            onButtonClick={onPrimaryClicked}
                            secondaryText={!questionnairesStore.requiresSecondSection ? 'המשך בכל זאת לחלק ב' : undefined}
                            onSecondaryClick={!questionnairesStore.requiresSecondSection ? onSecondaryClicked : undefined}>
      <IntroContainer>
        <StyledImage src="/second-section.png"/>
        <h1 className="margin-bottom-xxs">חלק א' הושלם!</h1>
        <StyledText>
          <p>
            {
              'תודה רבה על שהשלמת את החלק הראשון של השאלון.\n'
            }
          </p>
          <p>
            {
              questionnairesStore.requiresSecondSection &&
              `כעת נעבור לשלב הבא שבו יוצגו בפניך שאלות מפורטות ומעמיקות יותר. השאלות הללו נחוצות לצורך קבלת תמונה מלאה ומדויקת של תגובותיך וחוויותיך. יכול להיות שחלק מהשאלות יעסקו בנושאים שכבר נגענו בהם במהלך החלק הראשון. להרחבה ולהחזרה על נושאים מסוימים יש חלק מאוד חשוב בתהליך ההערכה הכולל, ואנחנו מעריכים את שיתוף הפעולה והסבלנות שלך!`
            }
            {
              !questionnairesStore.requiresSecondSection &&
              `לנוכח האירועים שעברת תגובותיך אינן חריגות, ואנו מעודדים אותך לסיים את התהליך בלחיצה על "סיום האבחון". אם את/ה מעוניינ/ת בכל זאת להרחיב ולהעמיק את ההערכה, אפשר לבחור להמשיך לחלק ב'.`
            }
          </p>
        </StyledText>
      </IntroContainer>
    </StickyBottomButtonPage>
  );
});

export type SecondSectionIntroProps = {
  questionnairesStore: QuestionnairesStore;
}

const IntroContainer = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    text-align: center;
    flex: 1;
    width: 100%;
  `,
  StyledImage = styled.img`
    width: 60%;
    max-width: 250px;
    margin-bottom: 32px;
    @media (max-width: 390px) {
      width: 70%;
      margin-bottom: 16px;
    }
  `,
  StyledText = styled.div`
    white-space: pre-wrap;
    padding: 24px 48px;
    @media (max-width: ${mobile.max}) {
      padding: 16px;
    }
  `;

