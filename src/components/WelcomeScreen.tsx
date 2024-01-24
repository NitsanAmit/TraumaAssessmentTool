import { observer } from 'mobx-react-lite';
import styled from 'styled-components';
import { Button } from '@fluentui/react-components';

export const WelcomeScreen: React.FC<WelcomeScreenProps> = observer(({ onNextClicked }) => {
  return (
    <WelcomeScreenContainer>
      <div className="margin-sm">
        <StyledImage src="/blue-male.png"/>
        <h1>כלי התייעצות אישית בעקבות מצבי דחק בישראל - 2024</h1>
        <div className="margin-bottom-ml">הכלי פותח ע"י המועצה הישראלית לפוסט טראומה לצורך אבחון יעיל ומהיר יותר של
          מצוקה פוסט טראומטית לאחר אירועי השבעה באוקטובר 2023
        </div>
        <div className="margin-bottom-xxl">כמעט כל מי שחיים בארץ מאז השבעה לאוקטובר התנסו בחוויות קשות, חרדות דאגה ואירועים
          חריגים. אנו מציגים לך מקבץ שאלונים שיעריך את תגובותיך לאירועים ויציג לך סיכום אישי לצרוך הערכה-עצמית, זיהוי
          בעיות בוערות, והערכת הצורך בהתייעצות עם גורמי טיפול. השאלונים הם אישיים וחסויים. הנתונים נמחקים עם תום
          ההתייעצות.
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
    width: 80%;
    max-width: 350px;
    margin-bottom: 54px;
  `;
