import { observer } from 'mobx-react-lite';
import styled from 'styled-components';
import { useEffect } from 'react';
import { useFirebase } from './hooks/useFirebase';
import { StickyBottomButtonPage } from './StickyButtonPage';
import { Button, Divider } from '@fluentui/react-components';
import { ChevronLeft24Filled } from '@fluentui/react-icons';
import { mobile, smallDesktop } from './styles/style.consts';

export const WelcomeScreen: React.FC<WelcomeScreenProps> = observer(({ onNextClicked }) => {

  const { logEvent } = useFirebase();
  useEffect(() => {
    logEvent('welcome_page_visited');
  }, [logEvent]);

  return (
    <div className="flex-column flex-1">
      <Container>
        <RightColumn>
          <StyledImage className="full-width" src="/blue-male.png"/>
        </RightColumn>
        <LeftColumn>
          <StickyBottomButtonPage className="full-height" buttonText={'התחלה'} onButtonClick={onNextClicked} smallScreenOnly>
            <div className="flex-column space-between flex-1">
              <div className="flex-column">
                <StyledHeader>כלי אבחון עצמי של פוסט־טראומה בישראל 2024</StyledHeader>
                <p>
                  {
                    'מאז השבעה באוקטובר סביר להניח שהתנסית, כמו כולנו, בחוויות קשות, חרדות, דאגה ואירועים מטרידים. חלקנו חווינו טראומה באופן מיידי וישיר, וחלקנו באופן עקיף דרך הקרובים והחברים, ובשגרת החיים שהשתבשה. התגובות למצב עשויות להיות קשות, וחשוב לקבל הדרכה או עזרה.'
                  }
                </p>
                <p>
                  {
                    'לפניך שאלונים שבעזרתם תוכל/י להעריך את עוצמת תגובותיך ואם יש צורך בעזרה מקצועית. ייתכן שאפילו מילוי השאלונים לכשעצמו יעזור לך להתבונן פנימה ולזהות תגובות שצריך להתמודד איתן.'
                  }
                </p>
                {
                  'השאלונים הם אישיים וחסויים, והנתונים נמחקים עם סיום מילוי השאלונים. באפשרותך לבחור שלא לשתף את צוות המחקר עם התוצאות האנונימיות שלך.\n'
                }
              </div>
              <StyledTextContainer>
                <Divider className="margin-top-xl" appearance="brand"/>
                <ButtonContainer className="flex-row space-between align-center">
                  <div className="flex-column">
                    <StyledH2>למי מיועד הכלי?</StyledH2>
                    הכלי נועד לכל אדם שחווה תגובות קשות לאירועים טראומטיים, ובמיוחד:
                    <StyledUl>
                      <li>אם חווית בעצמך אירוע טראומטי.</li>
                      <li>אם קרובים או מכרים שלך עברו אירוע טראומטי.</li>
                      <li>אם את/ה מרגיש/ה מצוקה כתוצאה מאירועי המלחמה והמצב.</li>
                    </StyledUl>
                  </div>
                  <StyledButton appearance="primary" size="large" shape="circular" onClick={onNextClicked}
                                icon={<ChevronLeft24Filled/>} iconPosition="after">
                    התחלה
                  </StyledButton>
                </ButtonContainer>
                <Divider className="margin-bottom-xl" appearance="brand"/>
              </StyledTextContainer>
            </div>
          </StickyBottomButtonPage>
        </LeftColumn>
      </Container>
      <Footer>
        <div className="margin-bottom-xs">הכלי פותח בשיתוף המועצה הלאומית לפוסט-טראומה.
        </div>
        <div>פיתוח מקצועי ותוכן: פרופ' אריה שלו, פרופ' שרה פרידמן, ד"ר יעל שובל-צוקרמן. מנהל הפרויקט: צחי זאבי.
        </div>
      </Footer>
    </div>
  );
});

export type WelcomeScreenProps = {
  onNextClicked: () => void;
}

const StyledHeader = styled.h1`
          @media (max-width: ${mobile.max}) {
            text-align: center;
          }
  `,
  StyledUl = styled.ul`
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    margin-top: 8px;
    margin-bottom: 24px;
    padding-inline-start: 20px;
  `,
  StyledH2 = styled.h2`
    margin-top: 16px;
    margin-bottom: 16px;
  `,
  StyledTextContainer = styled.div`
    text-align: right;
  `,
  StyledButton = styled(Button)`
    width: 300px;
    height: 54px;
    font-size: 20px;
    margin: 32px;
    @media (max-width: ${smallDesktop.max}) {
      margin: 0 16px 32px;
    }
    @media (max-width: ${mobile.max}) {
      display: none;
    }
  `,
  ButtonContainer = styled.div`
    display: flex;
    flex-direction: row;
    @media (max-width: 1024px) {
      flex-direction: column;
    }
  `,
  StyledImage = styled.img`
    width: 90%;
    box-sizing: border-box;
    padding: 32px;
    @media (max-width: ${mobile.max}) {
      padding: 24px;
      max-width: 400px;
    }
  `,
  Container = styled.div`
    background: #f8f8f8;
    flex: 1;
    display: flex;
    flex-direction: column;
    @media (min-width: ${mobile.min}) {
      flex-direction: row;
    }
  `,
  RightColumn = styled.div`
    background: white;
    flex: 0 0 40%;
    order: 1;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    min-width: 300px;
    @media (max-width: ${mobile.max}) {
      flex: 0;
    }
  `,
  LeftColumn = styled.div`
    background: #f8f8f8;
    height: 100%;
    overflow-y: auto;
    flex: 1;
    order: 2;
    @media (max-width: ${mobile.max}) {
      background: white;
      flex: 1;
    }
  `,
  Footer = styled.div`
    background: #e8e8e8;
    color: #b2b2b2;
    padding: 32px;
    text-align: center;
  `;
