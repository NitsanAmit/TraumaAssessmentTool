import { observer } from 'mobx-react-lite'
import styled from 'styled-components';
import { Outlet } from 'react-router-dom';

export const App: React.FC = observer(() => {

  return (
    <AppContainer>
      <Outlet/>
    </AppContainer>
  );
});

const AppContainer = styled.div`
  background-color: #efefef;
  display: flex;
  justify-content: center;
  width: calc(100% - 32px);
  height: calc(100vh - 32px);
  padding: 16px;
  @media (max-width: 560px) {
    padding: 8px;
    width: calc(100% - 16px);
    height: calc(100vh - 16px);
  }
  @media (max-width: 390px) {
    padding: 0;
    width: 100%;
    height: 100vh;
  }
`;
