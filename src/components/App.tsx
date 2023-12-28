import { APPLICATION_STEP, ApplicationStateStore } from '../store/ApplicationStateStore';
import { useState } from 'react';
import { WelcomeScreen } from './WelcomeScreen';
import { PersonalDetails } from './PersonalDetails';
import { QuestionnairesFlow } from './questionnaires/base/QuestionnairesFlow';
import { Summary } from './Summary';
import { observer } from "mobx-react-lite"

export const App: React.FC = observer(() => {

  const [appStateStore, setAppStateStore] = useState(new ApplicationStateStore());
  console.log("render app");

  return (
    <div className="App">
      {
        appStateStore.step === APPLICATION_STEP.WELCOME &&
        <WelcomeScreen appStateStore={appStateStore} />
      }
      {
        appStateStore.step === APPLICATION_STEP.PERSONAL_DETAILS &&
        <PersonalDetails personalDetailsStore={appStateStore.personalDetailsStore} />
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
