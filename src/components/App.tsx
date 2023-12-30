import { APPLICATION_STEP, ApplicationStateStore } from '../store/ApplicationStateStore';
import { useState } from 'react';
import { WelcomeScreen } from './WelcomeScreen';
import { PersonalDetails } from './PersonalDetails';
import { QuestionnairesFlow } from './questionnaires/QuestionnairesFlow';
import { Summary } from './Summary';
import { observer } from 'mobx-react-lite'
import styled from 'styled-components';
import { ChevronLeft24Regular } from '@fluentui/react-icons';
import { Button } from '@fluentui/react-components';

export const App: React.FC = observer(() => {

  const [appStateStore] = useState(new ApplicationStateStore());

  return (
    <AppContainer>
      <ResponsiveLayout>
        {
          appStateStore.step !== APPLICATION_STEP.WELCOME &&
          <CommandBar>
            <StepDisplayName>{appStateStore.stepDisplayName}</StepDisplayName>
            <Button appearance="subtle" iconPosition="after" size="small" icon={<ChevronLeft24Regular/>}
                    onClick={() => appStateStore.back()}>חזרה</Button>
          </CommandBar>
        }
        {
          appStateStore.step === APPLICATION_STEP.WELCOME &&
          <WelcomeScreen onNextClicked={() => appStateStore.next()}/>
        }
        {
          appStateStore.step === APPLICATION_STEP.PERSONAL_DETAILS &&
          <PersonalDetails personalDetailsStore={appStateStore.personalDetailsStore}
                           onNextClicked={() => appStateStore.next()}/>
        }
        {
          appStateStore.step === APPLICATION_STEP.QUESTIONNAIRES &&
          <QuestionnairesFlow questionnairesStore={appStateStore.questionnairesStore}/>
        }
        {
          appStateStore.step === APPLICATION_STEP.SUMMARY &&
          <Summary appStateStore={appStateStore}/>
        }
      </ResponsiveLayout>
    </AppContainer>
  );
});

const AppContainer = styled.div`
          display: flex;
          justify-content: center;
          width: 100%;
  `,
  ResponsiveLayout = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 100%;
    max-width: 800px;
    padding: 24px;
    @media (max-width: 400px) {
      padding: 16px 8px;
    }
  `,
  CommandBar = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    font-size: 12px;
    width: 100%;
  `,
  StepDisplayName = styled.div`
    font-weight: 300;
    margin-right: 8px;
  `;
