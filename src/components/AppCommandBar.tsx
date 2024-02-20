import { APPLICATION_STEP, ApplicationStateStore } from '../store/ApplicationStateStore';
import { observer } from 'mobx-react-lite'
import styled from 'styled-components';
import { ChevronRight24Regular, ArrowHookUpLeft24Regular, ArrowBounce24Regular } from '@fluentui/react-icons';
import { Button } from '@fluentui/react-components';
import { useDebugMode } from './hooks/useDebugMode';

export const AppCommandBar: React.FC<AppCommandBarProps> = observer(({ appStateStore }) => {

  const debugMode = useDebugMode();

  return (
    <CommandBar>
      <div>
        {
          <StyledButton appearance="subtle" size="small" icon={<ChevronRight24Regular/>} shape="circular"
                        onClick={() => appStateStore.back()}>{appStateStore.backText}</StyledButton>
        }
        {
          appStateStore.step === APPLICATION_STEP.SUMMARY &&
          <StyledButton appearance="subtle" iconPosition="after" size="small" icon={<ArrowHookUpLeft24Regular/>}
                        shape="circular"
                        onClick={() => window.location.reload()}>התחלה מחדש</StyledButton>
        }
        {
          debugMode && appStateStore.step !== APPLICATION_STEP.SUMMARY &&
          <StyledButton appearance="subtle" iconPosition="after" size="small" icon={<ArrowBounce24Regular/>} shape="circular"
                        onClick={() => appStateStore.skip()}>דלג</StyledButton>
        }
        {
          !debugMode && appStateStore.step === APPLICATION_STEP.PERSONAL_DETAILS &&
          <StyledButton appearance="subtle" iconPosition="after" size="small" icon={<ArrowBounce24Regular/>} shape="circular"
                        onClick={() => appStateStore.next()}>דלג</StyledButton>
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
          font-size: 14px;
          width: 100%;
          padding: 16px;
          box-sizing: border-box;
          border-bottom: 1px solid #e5e5e5;
  `,
  StepDisplayName = styled.div`
    font-weight: 400;
    margin-right: 8px;
  `,
  StyledButton = styled(Button)`
    font-size: 14px;
  `;
