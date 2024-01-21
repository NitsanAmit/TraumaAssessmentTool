import { observer } from 'mobx-react-lite';
import styled from 'styled-components';
import { Button } from '@fluentui/react-components';

export const WelcomeScreen: React.FC<WelcomeScreenProps> = observer(({ onNextClicked }) => {
  return (
    <WelcomeScreenContainer>
      <h1>כלי אבחון פוסט-טראומה ראשוני</h1>
      <div className="margin-bottom-xl">מקבץ שאלונים לאיבחון וסיווג הפרעות פוסט-טראומה, אשר בסופם יוצג סיכום אישי המיועד להתייעצות עם גורמי בריאות הנפש. </div>
      <div className="margin-bottom-xl">הכלי פותח ע"י המועצה הישראלית לפוסט טראומה לטובת איבחון יעיל ומהיר יותר של אוכלוסיות הנמצאות בסיכון לפיתוח PTSD לאחר אירועי ה-7.10</div>
      <Button className="full-width" appearance="primary" onClick={onNextClicked} size="large">התחלה</Button>
    </WelcomeScreenContainer>
  );
});

export type WelcomeScreenProps = {
  onNextClicked: () => void;
}

const WelcomeScreenContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
`;
