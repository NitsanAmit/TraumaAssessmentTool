import { APPLICATION_STEP, ApplicationStateStore } from '../store/ApplicationStateStore';
import { useMemo } from 'react';
import { observer } from 'mobx-react-lite'
import styled from 'styled-components';
import { ChevronLeft24Regular, ArrowHookUpLeft24Regular, ArrowBounce24Regular } from '@fluentui/react-icons';
import { Button } from '@fluentui/react-components';
import { useSearchParams } from 'react-router-dom';

export const AppCommandBar: React.FC<AppCommandBarProps> = observer(({ appStateStore}) => {

  const [searchParams] = useSearchParams();
  const debugMode = useMemo(() => searchParams.get('mode') === 'debug', [searchParams]);

  return (
    <CommandBar>
      <StepDisplayName>{appStateStore.stepDisplayName}</StepDisplayName>
      <div>
        {
          appStateStore.step !== APPLICATION_STEP.SUMMARY &&
          <Button appearance="subtle" iconPosition="after" size="small" icon={<ChevronLeft24Regular/>}
                  onClick={() => appStateStore.back()}>חזרה</Button>
        }
        {
          appStateStore.step === APPLICATION_STEP.SUMMARY &&
          <Button appearance="subtle" iconPosition="after" size="small" icon={<ArrowHookUpLeft24Regular/>}
                  onClick={() => window.location.reload()}>התחלה מחדש</Button>
        }
        {
          debugMode && appStateStore.step !== APPLICATION_STEP.SUMMARY &&
          <Button appearance="subtle" iconPosition="after" size="small" icon={<ArrowBounce24Regular/>}
                  onClick={() => appStateStore.skip()}>דלג</Button>
        }
      </div>
    </CommandBar>
  );
});

export type AppCommandBarProps = {
  appStateStore: ApplicationStateStore;
}

const CommandBar = styled.div`
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
