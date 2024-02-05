import { StickyBottomButtonPage } from '../components/StickyButtonPage';
import { Card, Input, Spinner } from '@fluentui/react-components';
import styled from 'styled-components';
import { useState } from 'react';
import { useFirebase } from '../components/hooks/useFirebase';
import { browserLocalPersistence, setPersistence, signInWithEmailAndPassword } from 'firebase/auth';
import { useNavigate } from 'react-router-dom';


export const Login = () => {

  const navigate = useNavigate();
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [errorMessage, setErrorMessage] = useState<string>('');
  const { auth } = useFirebase();
  if (!auth) {
    return <Spinner/>;
  }

  const authenticate = () => {
    setPersistence(auth, browserLocalPersistence)
      .then(() => signInWithEmailAndPassword(auth, email, password))
      .then(() => {
        navigate('/manage/data');
      })
      .catch((error) => {
        setErrorMessage(error.message);
      });
  }

  return (
    <StyledCard size="large">
      <StickyBottomButtonPage buttonText="כניסה" onButtonClick={authenticate}>
        <StyledContainer>
          <h1>התחברות צוות</h1>
          <StyledInput type="email" size="large" placeholder="אימייל" value={email}
                       onChange={(e) => setEmail(e.target.value)}/>
          <StyledInput type="password" size="large" placeholder="סיסמה" value={password}
                       onChange={(e) => setPassword(e.target.value)}/>
          <StyledErrorMessage>{errorMessage}</StyledErrorMessage>
        </StyledContainer>
      </StickyBottomButtonPage>
    </StyledCard>
  );
}

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
  StyledContainer = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    flex: 1;
    row-gap: 24px;
  `,
  StyledInput = styled(Input)`
    width: 80%;
    text-align: left;
    direction: ltr;
  `,
  StyledErrorMessage = styled.p`
    color: #c45a51;
  `;
