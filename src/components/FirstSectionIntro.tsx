import { observer } from 'mobx-react-lite';
import styled from 'styled-components';
import { Button } from '@fluentui/react-components';

export const FirstSectionIntro: React.FC<FirstSectionIntroProps> = observer(({ onNextClicked }) => {
  return (
    <IntroContainer>
      <div>
        <StyledImage src="/first-section.png"/>
        <h1 className="margin-bottom-xxs">רגע לפני שנתחיל</h1>
        <StyledText className="margin-bottom-xl">
          <p>
            לפניך סדרת שאלונים בת שני חלקים, שנועדו לעזור לנו להבין האם ייתכן ואת/ה סובל/ת מפוסט טראומה.
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
      <Button className="full-width" appearance="primary" onClick={onNextClicked} size="large" shape="circular">התחלת
        השלב הראשון</Button>
    </IntroContainer>
  );
});

export type FirstSectionIntroProps = {
  onNextClicked: () => void;
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
    width: 80%;
    max-width: 350px;
    margin-bottom: 32px;
  `,
  StyledText = styled.div`
    white-space: pre-wrap;
  `;
