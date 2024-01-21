import { observer } from 'mobx-react-lite'
import styled from 'styled-components';
import { Card } from '@fluentui/react-components';
import { Outlet } from 'react-router-dom';

export const App: React.FC = observer(() => {

  return (
    <AppContainer>
      <StyledCard size="large">
        <Outlet />
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
  `;
