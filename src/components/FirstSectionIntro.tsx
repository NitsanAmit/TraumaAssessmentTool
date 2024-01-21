import { observer } from 'mobx-react-lite';
import styled from 'styled-components';
import { Button } from '@fluentui/react-components';

export const FirstSectionIntro: React.FC<FirstSectionIntroProps> = observer(({ onNextClicked }) => {
  return (
    <IntroContainer>
      <h1>רגע לפני שנתחיל</h1>
      <div className="margin-bottom-xl">כאן יוצג הסבר קצר על השאלונים והשלבים שעומדים לעבור</div>
      <Button className="full-width" appearance="primary" onClick={onNextClicked} size="large">התחלת השלב הראשון</Button>
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
`;
