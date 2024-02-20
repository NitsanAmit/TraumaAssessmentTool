import { observer } from 'mobx-react-lite'
import styled from 'styled-components';
import { Outlet } from 'react-router-dom';
import { useEffect } from 'react';

export const App: React.FC = observer(() => {

  useEffect(() => {
    const listener = () => {
      const vh = window.innerHeight * 0.01;
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
  background-color: white;
  display: flex;
  flex-direction: row;
  justify-content: center;
  padding: 0;
  width: 100%;
  height: 100vh;
  height: calc(var(--vh, 1vh) * 100);
`;
