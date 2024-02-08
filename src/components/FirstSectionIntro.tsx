import { observer } from 'mobx-react-lite';
import styled from 'styled-components';
import { Checkbox, Divider } from '@fluentui/react-components';
import { useEffect, useState } from 'react';
import { useFirebase } from './hooks/useFirebase';
import { StickyBottomButtonPage } from './StickyButtonPage';

export const FirstSectionIntro: React.FC<FirstSectionIntroProps> = observer(({ onNextClicked }) => {

  const [optOut, setOptOut] = useState<boolean>(false);
  const { logEvent } = useFirebase();
  useEffect(() => {
    logEvent('first_section_intro_visited');
  }, [logEvent]);
  return (
    <StickyBottomButtonPage buttonText={'התחלת החלק הראשון'} onButtonClick={() => onNextClicked(optOut)}>
      <IntroContainer>
        <StyledImage src="/first-section.png"/>
        <h1 className="margin-bottom-xxs">רגע לפני שנתחיל</h1>
        <StyledText className="flex-column align-center margin-bottom-xl">
          <p>
            {
              'לפניך סדרת שאלונים בת שני חלקים, שנועדו לעזור לנו להבין האם ייתכן שאת/ה סובל/ת מפוסט־טראומה. ' +
              'תוצאות החלק הראשון יקבעו האם כדאי להמשיך ולמלא את השאלונים בחלק השני, על סמך התשובות שתספק/י.\n'
            }
            כאשר אנחנו שואלים על אירוע קשה או טראומטי, הכוונה היא לאירוע שנתפס ככזה על ידך. זה יכול להיות אירוע שהייתה
            בו סכנה גופנית או נפשית לך או לסובבים אותך, חשיפה למראות זוועה, אבדן חיים או כל חוויה קשה אחרת.
            ייתכן שלא עברת אף אירוע ייחודי כזה ובכל זאת את/ה מרגיש/ה מצוקה, ובמקרה זה התייחס/י בשאלות לתקופה עצמה בתור
            האירוע.
          </p>
          <p>
            שימ/י לב שיש שאלות שחוזרות על עצמן - זה חלק מהתהליך והמטרה היא לוודא שאנחנו מקבלים ממך את המידע המדויק והאמין
            ביותר.
            מומלץ לבחור מקום שקט ונוח למילוי השאלונים, כדי שתוכל/י להתמקד בשאלות ולתת את התשובות הנכונות ביותר עבורך.
          </p>
          <StyledDivider className="margin-vertical-sm" appearance="brand" inset={true}/>
          {
            'אם עוזבים את הדף התשובות לא נשמרות, ולכן חשוב למלא ברצף מההתחלה ועד הסוף.\n' +
            'מזכירים שהתשובות שנקבל ממך חסויות ולא נשמרות באף מקום אצלנו.'
          }
          <StyledDivider className="margin-vertical-sm" appearance="brand" inset={true}/>
        </StyledText>
      </IntroContainer>
      <div className="full-width align-text-center">
        <Checkbox label="אני מאשר/ת איסוף מידע אנונימי לצרכי מחקר ושיפור כלי זה" checked={!optOut}
                  onChange={() => setOptOut(!optOut)}/>
      </div>
    </StickyBottomButtonPage>
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
  `,
  StyledImage = styled.img`
    width: 70%;
    max-width: 350px;
    margin-bottom: 32px;
    @media (max-width: 390px) {
      width: 80%;
      margin-bottom: 16px;
    }
  `,
  StyledText = styled.div`
    white-space: pre-wrap;
  `,
  StyledDivider = styled(Divider)`
    max-width: 500px;
  `;
