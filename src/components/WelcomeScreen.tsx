import { observer } from 'mobx-react-lite';
import styled from 'styled-components';
import { useEffect } from 'react';
import { useFirebase } from './hooks/useFirebase';
import { StickyBottomButtonPage } from './StickyButtonPage';

export const WelcomeScreen: React.FC<WelcomeScreenProps> = observer(({ onNextClicked }) => {

  const { logEvent } = useFirebase();
  useEffect(() => {
    logEvent('welcome_page_visited');
  }, [logEvent]);

  return (
    <StickyBottomButtonPage buttonText={'התחלה'} onButtonClick={onNextClicked}>
      <div className="flex-column align-center align-text-center">
        <StyledImage src="/blue-male.png"/>
        <h1>כלי התייעצות אישית בעקבות מצבי דחק בישראל - 2024</h1>
        <div className="margin-bottom-xs pre-wrap">
          <p>
            {
              'מאז השבעה לאוקטובר בוודאי התנסית, כמו כולנו, בחוויות קשות, חרדות דאגה ואירועים חריגים. אנו מציגים לך מקבץ שאלונים שיעריך את תגובותיך לאירועים ויציג לך סיכום אישי לצורך הערכה־עצמית, זיהוי בעיות בוערות, והערכת הצורך בהתייעצות עם גורמי טיפול.\n'
            }
            </p>
          <p>
            {
              'כאשר אנחנו שואלים על אירוע קשה/טראומטי בשאלונים הבאים, הכוונה היא לאירוע שנתפס ככזה על ידך, אירוע שהייתה בו סכנה גופנית או נפשית לך, לבני משפחתך או לסובבים אותך, הייתה בו חשיפה למראות זוועה, אבדן חיים או כל חוויה קשה אחרת. אם עברת מספר אירועים קשים נסה/י לחשוב על האירוע הקשה ביותר.\n'
            }
          </p>
          {
            'השאלונים הם אישיים וחסויים, והנתונים נמחקים עם תום ההתייעצות. באפשרותך לבחור שלא לשתף את צוות המחקר עם התוצאות האנונימיות שלך.\n'
          }
        </div>
      </div>
    </StickyBottomButtonPage>
  );
});

export type WelcomeScreenProps = {
  onNextClicked: () => void;
}

const StyledImage = styled.img`
    width: 70%;
    max-width: 350px;
    margin-bottom: 48px;
    @media (max-width: 390px) {
      width: 80%;
      margin-bottom: 8px;
    }
  `;
