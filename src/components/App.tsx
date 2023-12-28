import { APPLICATION_STEP, ApplicationStateStore } from '../store/ApplicationStateStore';
import { useState } from 'react';
import { WelcomeScreen } from './WelcomeScreen';
import { PersonalDetails } from './PersonalDetails';
import { QuestionnairesFlow } from './questionnaires/QuestionnairesFlow';
import { Summary } from './Summary';
import { observer } from "mobx-react-lite"
import "monday-ui-react-core/tokens";

export const App: React.FC = observer(() => {

  const [appStateStore, setAppStateStore] = useState(new ApplicationStateStore());

  return (
    <div className="flex-column align-center justify-center">
      {
        appStateStore.step === APPLICATION_STEP.WELCOME &&
        <WelcomeScreen appStateStore={appStateStore} />
      }
      {
        appStateStore.step === APPLICATION_STEP.PERSONAL_DETAILS &&
        <PersonalDetails personalDetailsStore={appStateStore.personalDetailsStore} onNextClicked={() => appStateStore.onPersonalDetailsFinished()} />
      }
      {
        appStateStore.step === APPLICATION_STEP.QUESTIONNAIRES &&
        <QuestionnairesFlow questionnairesStore={appStateStore.questionnairesStore} />
      }
      {
        appStateStore.step === APPLICATION_STEP.SUMMARY &&
        <Summary appStateStore={appStateStore} />
      }
    </div>
  );
});
