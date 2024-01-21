import { APPLICATION_STEP, ApplicationStateStore } from '../store/ApplicationStateStore';
import { useEffect, useState } from 'react';
import { WelcomeScreen } from './WelcomeScreen';
import { PersonalDetails } from './PersonalDetails';
import { QuestionnairesFlow } from './questionnaires/QuestionnairesFlow';
import { Summary } from './Summary';
import { observer } from 'mobx-react-lite'
import styled from 'styled-components';
import { AppCommandBar } from './AppCommandBar';
import { Card, Spinner } from '@fluentui/react-components';
import { useQuestions } from './hooks/useQuestions';

export const App: React.FC = observer(() => {

  const questions = useQuestions();
  const [appStateStore, setAppStateStore] = useState<ApplicationStateStore>();

  useEffect(() => {
    if (questions) {
      setAppStateStore(new ApplicationStateStore(questions));
    }
  }, [questions]);

  return (
    <AppContainer>
      <StyledCard size="large">
        {
          !appStateStore &&
          <Spinner/>
        }
        {
          appStateStore &&
          <ResponsiveLayout>
            {
              appStateStore.step !== APPLICATION_STEP.WELCOME &&
              <AppCommandBar appStateStore={appStateStore}/>
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
        }
      </StyledCard>
    </AppContainer>
  );
});

const AppContainer = styled.div`
          background-color: #efefef;
          display: flex;
          justify-content: center;
          width: calc(100% - 32px);
          height: calc(100% - 32px);
          padding: 16px;
          @media (max-width: 560px) {
            padding: 8px;
            width: calc(100% - 16px);
            height: calc(100% - 16px);
          }
          @media (max-width: 390px) {
            padding: 0;
            width: 100%;
            height: 100%;
          }
  `,
  StyledCard = styled(Card)`
    width: 100%;
    height: 100%;
    overflow-y: auto;
    display: flex;
    align-items: center;
    max-width: 800px;
    @media (max-width: 390px) {
      border-radius: 0;
    }
  `,
  ResponsiveLayout = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 100%;
  `;
