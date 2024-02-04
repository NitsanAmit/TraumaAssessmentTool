import { observer } from 'mobx-react-lite';
import styled from 'styled-components';
import { useEffect } from 'react';
import { useFirebase } from './hooks/useFirebase';
import { StickyBottomButtonPage } from './StickyButtonPage';
import { Divider } from '@fluentui/react-components';

export const WelcomeScreen: React.FC<WelcomeScreenProps> = observer(({ onNextClicked }) => {

  const { logEvent } = useFirebase();
  useEffect(() => {
    logEvent('welcome_page_visited');
  }, [logEvent]);

  return (
    <StickyBottomButtonPage buttonText={'התחלה'} onButtonClick={onNextClicked}>
      <div className="flex-column align-center align-text-center">
        <StyledImage src="/blue-male.png"/>
        <h1>כלי אבחון עצמי של פוסט־טראומה בישראל - 2024</h1>
        <div className="flex-column align-center pre-wrap">
          <p>
            {
              'מאז השבעה לאוקטובר בוודאי התנסית, כמו כולנו, בחוויות קשות, חרדות, דאגה ואירועים מטרידים. חלקנו חווינו טראומה באופן מיידי וישיר, וחלקנו באופן עקיף דרך הקרובים והחברים, ובשגרת החיים שהשתבשה. התגובות למצב עשויות להיות קשות, וחשוב לקבל הדרכה או עזרה.'
            }
          </p>
          <p>
            {
              'לפניך שאלונים שבעזרתם תוכל/י להעריך את עוצמת תגובותיך ואת הצורך בעזרה מקצועית. ייתכן שאפילו מילוי השאלונים לכשעצמו יעזור לך להתבונן פנימה ולזהות תגובות שצריך להתמודד איתן.'
            }
          </p>
          {
            'השאלונים הם אישיים וחסויים, והנתונים נמחקים עם תום ההתייעצות. באפשרותך לבחור שלא לשתף את צוות המחקר עם התוצאות האנונימיות שלך.\n'
          }
          <StyledDivider className="margin-top-ml" appearance="brand" inset={true}/>
          <StyledH2>למי מיועד הכלי?</StyledH2>
          הכלי נועד לכל אדם שחווה תגובות קשות לאירועים טראומטיים, ובמיוחד:
          <StyledUl>
            <li>אם חווית בעצמך אירוע טראומטי.</li>
            <li>אם קרובים או מכרים שלך עברו אירוע טראומטי.</li>
            <li>אם את מרגישה מצוקה כתוצאה מאירועי המלחמה והמצב.</li>
          </StyledUl>
          <StyledDivider className="margin-bottom-ml" appearance="brand" inset={true}/>
          <p>הכלי פותח עבור המועצה הלאומית לפוסט-טראומה, ע"י פסיכיאטרים ופסיכולוגים מומחים בתחום.</p>
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
  `,
  StyledUl = styled.ul`
    display: flex;
    flex-direction: column;
    align-items: center;
    margin-top: 8px;
    margin-bottom: 24px;
    padding-inline-start: 16px;
  `,
  StyledH2 = styled.h2`
    margin-top: 16px;
    margin-bottom: 4px;
  `,
  StyledDivider = styled(Divider)`
  max-width: 500px;
  `;
