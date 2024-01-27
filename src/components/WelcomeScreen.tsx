import { observer } from 'mobx-react-lite';
import styled from 'styled-components';
import { Button, Checkbox } from '@fluentui/react-components';
import { useState } from 'react';

export const WelcomeScreen: React.FC<WelcomeScreenProps> = observer(({ onNextClicked }) => {

  const [optOut, setOptOut] = useState<boolean>(false);

  return (
    <WelcomeScreenContainer>
      <div className="margin-sm">
        <StyledImage src="/blue-male.png"/>
        <h1>כלי התייעצות אישית בעקבות מצבי דחק בישראל - 2024</h1>
        <div className="margin-bottom-ml">הכלי פותח ע"י המועצה הישראלית לפוסט טראומה לצורך אבחון יעיל ומהיר יותר של
          מצוקה פוסט טראומטית לאחר אירועי השבעה באוקטובר 2023
        </div>
        <div className="margin-bottom-xs">
          מאז השבעה לאוקטובר בודאי התנסית, כמו כולנו, בחוויות קשות, חרדות דאגה ואירועים חריגים.
          אנו מציגים לך מקבץ שאלונים שיעריך את תגובותיך לאירועים ויציג לך סיכום אישי לצורך הערכה-עצמית, זיהוי בעיות בוערות, והערכת הצורך
          בהתייעצות עם גורמי טיפול.
          השאלונים הם אישיים וחסויים, והנתונים נמחקים עם תום ההתייעצות
        </div>
      </div>
      <div>
        <Checkbox label="אני מאשר/ת איסוף מידע אנונימי לצורך מחקר ופיתוח כלי זה"
                  checked={!optOut} onChange={() => setOptOut(!optOut)} className="margin-bottom-sm" />
        <Button className="full-width" appearance="primary" onClick={() => onNextClicked(optOut)} size="large"
                shape="circular">התחלה</Button>
      </div>
    </WelcomeScreenContainer>
  );
});

export type WelcomeScreenProps = {
  onNextClicked: (optOut: boolean) => void;
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
