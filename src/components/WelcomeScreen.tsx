import { observer } from 'mobx-react-lite';
import styled from 'styled-components';
import { Button } from '@fluentui/react-components';

export const WelcomeScreen: React.FC<WelcomeScreenProps> = observer(({ onNextClicked }) => {


  return (
    <WelcomeScreenContainer>
      <div className="margin-sm">
        <StyledImage src="/blue-male.png"/>
        <h1>כלי התייעצות אישית בעקבות מצבי דחק בישראל - 2024</h1>
        <div className="margin-bottom-ml">הכלי פותח ע"י המועצה הישראלית לפוסט־טראומה לצורך אבחון יעיל ומהיר יותר של
          מצוקה פוסט־טראומטית לאחר אירועי השבעה באוקטובר 2023
        </div>
        <div className="margin-bottom-xs pre-wrap">
          <p>
            {
              'מאז השבעה לאוקטובר בוודאי התנסית, כמו כולנו, בחוויות קשות, חרדות דאגה ואירועים חריגים. אנו מציגים לך מקבץ שאלונים שיעריך את תגובותיך לאירועים ויציג לך סיכום אישי לצורך הערכה־עצמית, זיהוי בעיות בוערות, והערכת הצורך בהתייעצות עם גורמי טיפול.\n' +
              'כאשר אנחנו שואלים על אירוע קשה/טראומטי בשאלונים הבאים, הכוונה היא לאירוע שנתפס ככזה על ידך, אירוע שהייתה בו סכנה גופנית או נפשית לך, לבני משפחתך או לסובבים אותך, הייתה בו חשיפה למראות זוועה, אבדן חיים או כל חוויה קשה אחרת. אם עברת מספר אירועים קשים נסה/י לחשוב על האירוע הקשה ביותר.\n'
            }
          </p>
          {
            'השאלונים הם אישיים וחסויים, והנתונים נמחקים עם תום ההתייעצות. באפשרותך לבחור שלא לשתף את צוות המחקר עם התוצאות האנונימיות שלך.\n'
          }
        </div>
      </div>
      <Button className="full-width" appearance="primary" onClick={onNextClicked} size="large" shape="circular">התחלה</Button>
    </WelcomeScreenContainer>
  );
});

export type WelcomeScreenProps = {
  onNextClicked: () => void;
}

const WelcomeScreenContainer = styled.div`
          display: flex;
          flex: 1;
          flex-direction: column;
          align-items: center;
          text-align: center;
          justify-content: space-between;
  `,
  StyledImage = styled.img`
    width: 70%;
    max-width: 350px;
    margin-bottom: 48px;
    @media (max-width: 390px) {
      width: 80%;
      margin-bottom: 8px;
    }
  `;
