import { APPLICATION_STEP, ApplicationStateStore } from '../store/ApplicationStateStore';
import { useMemo } from 'react';
import { observer } from 'mobx-react-lite'
import styled from 'styled-components';
import { ChevronRight24Regular, ArrowHookUpLeft24Regular, ArrowBounce24Regular } from '@fluentui/react-icons';
import { Button } from '@fluentui/react-components';
import { useSearchParams } from 'react-router-dom';

export const AppCommandBar: React.FC<AppCommandBarProps> = observer(({ appStateStore}) => {

  const [searchParams] = useSearchParams();
  const debugMode = useMemo(() => searchParams.get('mode') === 'debug', [searchParams]);

  return (
    <CommandBar>
      <div>
        {
          <Button appearance="subtle" size="small" icon={<ChevronRight24Regular/>} shape="circular"
                  onClick={() => appStateStore.back()}>{appStateStore.backText}</Button>
        }
        {
          appStateStore.step === APPLICATION_STEP.SUMMARY &&
          <Button appearance="subtle" iconPosition="after" size="small" icon={<ArrowHookUpLeft24Regular/>} shape="circular"
                  onClick={() => window.location.reload()}>התחלה מחדש</Button>
        }
        {
          debugMode && appStateStore.step !== APPLICATION_STEP.SUMMARY &&
          <Button appearance="subtle" iconPosition="after" size="small" icon={<ArrowBounce24Regular/>} shape="circular"
                  onClick={() => appStateStore.skip()}>דלג</Button>
        }
      </div>
      <StepDisplayName>{appStateStore.stepDisplayName}</StepDisplayName>
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
