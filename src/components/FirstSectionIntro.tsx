import { observer } from 'mobx-react-lite';
import styled from 'styled-components';
import { Button, Checkbox } from '@fluentui/react-components';
import { useState } from 'react';

export const FirstSectionIntro: React.FC<FirstSectionIntroProps> = observer(({ onNextClicked }) => {

  const [optOut, setOptOut] = useState<boolean>(false);

  return (
    <IntroContainer>
      <div>
        <StyledImage src="/first-section.png"/>
        <h1 className="margin-bottom-xxs">רגע לפני שנתחיל</h1>
        <StyledText className="margin-bottom-xl">
          <p>
            לפניך סדרת שאלונים בת שני חלקים, שנועדו לעזור לנו להבין האם ייתכן ואת/ה סובל/ת מפוסט־טראומה.
            תוצאות החלק הראשון יקבעו האם כדאי להמשיך ולמלא את השאלונים בחלק השני, על סמך התשובות שתספק/י.
          </p>
          <p>
            שימ/י לב שיש שאלות שחוזרות על עצמן - זה חלק מהתהליך והמטרה היא לוודא שאנו מקבלים את המידע המדויק והאמין
            ביותר.
            מומלץ לבחור מקום שקט ונוח למילוי השאלונים, כדי שתוכל/י להתמקד בשאלות ולתת את התשובות הנכונות ביותר עבורך.
          </p>
          מזכירים שהתשובות שנקבל ממך חסויות ולא נשמרות באף מקום אצלנו.
        </StyledText>
      </div>
      <div className="full-width">
        <Checkbox label="אני מאשר/ת איסוף מידע אנונימי לצרכי מחקר ושיפור כלי זה" checked={!optOut}
                  onChange={() => setOptOut(!optOut)} className="margin-bottom-sm"/>
      <Button className="full-width" appearance="primary" onClick={() => onNextClicked(optOut)} size="large" shape="circular">
        התחלת החלק הראשון
      </Button>
      </div>
    </IntroContainer>
  );
});

export type FirstSectionIntroProps = {
  onNextClicked: (optOut: boolean) => void;
}

const IntroContainer = styled.div`
          display: flex;
          flex-direction: column;
          align-items: center;
          text-align: center;
          flex: 1;
          justify-content: space-between;
  `,
  StyledImage = styled.img`
    width: 70%;
    max-width: 350px;
    margin-bottom: 32px;
    @media (max-width: 390px) {
      width: 80%;
      margin-bottom: 8px;
    }
  `,
  StyledText = styled.div`
    white-space: pre-wrap;
  `;
