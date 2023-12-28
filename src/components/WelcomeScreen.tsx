import { APPLICATION_STEP, ApplicationStateStore } from '../store/ApplicationStateStore';
import { Button } from 'monday-ui-react-core';
import { observer } from 'mobx-react-lite';
import styled from 'styled-components';

export const WelcomeScreen: React.FC<WelcomeScreenProps> = observer(({ appStateStore }) => {
  console.log("render welcome screen");
  return (
    <WelcomeScreenContainer>
      <Header>כלי אבחון פוסט-טראומה ראשוני</Header>
      <h2>הכלי פותח ע"י המועצה הישראלית לפוסט טראומה</h2>
      <Button onClick={() => appStateStore.step = APPLICATION_STEP.PERSONAL_DETAILS}>התחל</Button>
    </WelcomeScreenContainer>
  );
});

export type WelcomeScreenProps = {
  appStateStore: ApplicationStateStore;
}

const WelcomeScreenContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`,
  Header = styled.h1`
  color: salmon;
`;
