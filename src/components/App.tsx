import { observer } from 'mobx-react-lite'
import styled from 'styled-components';
import { Outlet } from 'react-router-dom';
import { useEffect } from 'react';

export const App: React.FC = observer(() => {

  useEffect(() => {
    const listener = () => {
      let vh = window.innerHeight * 0.01;
      document.documentElement.style.setProperty('--vh', `${vh}px`);
    };
    window.addEventListener('resize', listener);
    listener();
    return () => {
      window.removeEventListener('resize', listener);
    };
  }, []);
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
  height: calc(var(--vh, 1vh) * 100 - 32px);
  padding: 16px;
  @media (max-width: 560px) {
    padding: 8px;
    width: calc(100% - 16px);
    height: calc(100vh - 16px);
    height: calc(var(--vh, 1vh) * 100 - 16px);
  }
  @media (max-width: 390px) {
    padding: 0;
    width: 100%;
    height: 100vh;
    height: calc(var(--vh, 1vh) * 100);
  }
`;
