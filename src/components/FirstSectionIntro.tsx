import { observer } from 'mobx-react-lite';
import styled from 'styled-components';
import { Checkbox, Divider } from '@fluentui/react-components';
import { useEffect, useState } from 'react';
import { useFirebase } from './hooks/useFirebase';
import { StickyBottomButtonPage } from './StickyButtonPage';
import { ImagePage } from './ImagePage';

export const FirstSectionIntro: React.FC<FirstSectionIntroProps> = observer(({ onNextClicked }) => {

  const [optOut, setOptOut] = useState<boolean>(false);
  const { logEvent } = useFirebase();
  useEffect(() => {
    logEvent('first_section_intro_visited');
  }, [logEvent]);
  return (
    <StickyBottomButtonPage buttonText={'התחלת החלק הראשון'} onButtonClick={() => onNextClicked(optOut)}>
      <IntroContainer>
        <ImagePage title="רגע לפני שנתחיל" imageSrc="/first-section.png">
          <p className="align-text-right pre-wrap">
            {
              'לפניך סדרת שאלונים בת שני חלקים, שנועדו לעזור לנו להבין האם ייתכן שאת/ה סובל/ת מפוסט־טראומה. ' +
              'תוצאות החלק הראשון יקבעו האם כדאי להמשיך ולמלא את השאלונים בחלק השני, על סמך התשובות שתספק/י.\n'
            }
            כאשר אנחנו שואלים על אירוע קשה או טראומטי, הכוונה היא לאירוע שנתפס ככזה על ידך. זה יכול להיות אירוע
            שהייתה
            בו סכנה גופנית או נפשית לך או לסובבים אותך, חשיפה למראות זוועה, אבדן חיים או כל חוויה קשה אחרת.
            ייתכן שלא עברת אף אירוע ייחודי כזה ובכל זאת את/ה מרגיש/ה מצוקה, ובמקרה זה התייחס/י בשאלות לתקופה עצמה
            בתור
            האירוע.
          </p>
          <p className="align-text-right">
            שימ/י לב שיש שאלות שחוזרות על עצמן - זה חלק מהתהליך והמטרה היא לוודא שאנחנו מקבלים ממך את המידע המדויק
            והאמין
            ביותר.
            מומלץ לבחור מקום שקט ונוח למילוי השאלונים, כדי שתוכל/י להתמקד בשאלות ולתת את התשובות הנכונות ביותר
            עבורך.
          </p>
        </ImagePage>
        <div className="flex-column">
          <Divider className="margin-vertical-sm" appearance="brand" inset={true}/>
          {
            'אם עוזבים את הדף התשובות לא נשמרות, ולכן חשוב למלא ברצף מההתחלה ועד הסוף.\n' +
            'מזכירים שהתשובות שנקבל ממך חסויות ולא נשמרות באף מקום אצלנו.'
          }
          <Divider className="margin-vertical-sm" appearance="brand" inset={true}/>
        </div>
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
`;
