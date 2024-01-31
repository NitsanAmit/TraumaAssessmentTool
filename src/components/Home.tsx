import { APPLICATION_STEP, ApplicationStateStore } from '../store/ApplicationStateStore';
import { useEffect, useState } from 'react';
import { WelcomeScreen } from './WelcomeScreen';
import { PersonalDetails } from './PersonalDetails';
import { QuestionnairesFlow } from './questionnaires/QuestionnairesFlow';
import { Summary } from './Summary';
import { observer } from 'mobx-react-lite'
import { AppCommandBar } from './AppCommandBar';
import { Card, Spinner } from '@fluentui/react-components';
import { useQuestions } from './hooks/useQuestions';
import { FirstSectionIntro } from './FirstSectionIntro';
import styled from 'styled-components';
import { CompletedSecondSection } from './CompletedSecondSection';
import { useAnonymousResults } from './hooks/useAnonymousResults';

export const Home: React.FC = observer(() => {

  const questions = useQuestions();
  const { optOutOfAnonymousDataCollection, sendAnonymousResults } = useAnonymousResults();
  const [appStateStore, setAppStateStore] = useState<ApplicationStateStore>();

  useEffect(() => {
    if (questions) {
      setAppStateStore(new ApplicationStateStore(questions));
    }
  }, [questions]);

  return (
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
            appStateStore.step === APPLICATION_STEP.FIRST_SECTION_INTRO &&
            <FirstSectionIntro onNextClicked={(optOut: boolean) => {
              if (optOut) {
                optOutOfAnonymousDataCollection();
              }
              appStateStore.next();
            }}/>
          }
          {
            appStateStore.step === APPLICATION_STEP.PERSONAL_DETAILS &&
            <PersonalDetails personalDetailsStore={appStateStore.personalDetailsStore}
                             onNextClicked={() => appStateStore.next()}/>
          }
          {
            appStateStore.step === APPLICATION_STEP.QUESTIONNAIRES &&
            <QuestionnairesFlow questionnairesStore={appStateStore.questionnairesStore} />
          }
          {
            appStateStore.step === APPLICATION_STEP.COMPLETED_QUESTIONNAIRES &&
            <CompletedSecondSection resultsStore={appStateStore.resultsStore} onNextClicked={() => appStateStore.next()} />
          }
          {
            appStateStore.step === APPLICATION_STEP.SUMMARY &&
            <Summary resultsStore={appStateStore.resultsStore} personalDetailsSummary={appStateStore.personalDetailsStore.summary}
                     sendAnonymousResults={sendAnonymousResults} />
          }
        </ResponsiveLayout>
      }
    </StyledCard>
  );
})

const StyledCard = styled(Card)`
          width: 100%;
          height: 100%;
          overflow-y: auto;
          display: flex;
          align-items: center;
          max-width: 800px;
          padding: 0;
          @media (max-width: 390px) {
            border-radius: 0;
            padding: 0;
          }
  `,
  ResponsiveLayout = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 100%;
  `;
