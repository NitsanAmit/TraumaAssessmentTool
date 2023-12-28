import { APPLICATION_STEP, ApplicationStateStore } from '../store/ApplicationStateStore';
import { Button } from 'monday-ui-react-core';
import { observer } from 'mobx-react-lite';

export const WelcomeScreen: React.FC<WelcomeScreenProps> = observer(({ appStateStore }) => {
  console.log("render welcome screen");
  return (
    <>
      <h1>כלי אבחון פוסט-טראומה ראשוני</h1>
      <h2>הכלי פותח ע"י המועצה הישראלית לפוסט טראומה</h2>
      <Button onClick={() => appStateStore.step = APPLICATION_STEP.PERSONAL_DETAILS}>התחל</Button>
    </>
  );
});

export type WelcomeScreenProps = {
  appStateStore: ApplicationStateStore;
}
