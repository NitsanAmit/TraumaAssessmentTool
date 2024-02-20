import { observer } from 'mobx-react-lite';
import styled from 'styled-components';
import { PropsWithChildren } from 'react';
import { mobile, smallDesktop } from './styles/style.consts';

export const ImagePage: React.FC<PropsWithChildren<ImagePageProps>> = observer(({ children, imageSrc, title }) => {

  return (
    <Container>
      <RightColumn>
        <StyledImage src={imageSrc}/>
      </RightColumn>
      <LeftColumn>
        <h1 className="margin-bottom-xxs full-width align-text-right">{title}</h1>
        {children}
      </LeftColumn>
    </Container>
  );
});

export type ImagePageProps = {
  imageSrc: string;
  title: string;
}

const StyledImage = styled.img`
          width: 100%;
  `,
  Container = styled.div`
    flex: 1;
    display: flex;
    flex-direction: column;
    @media (min-width: ${mobile.min}) {
      flex-direction: row;
    }
  `,
  RightColumn = styled.div`
    flex: 0 0 40%;
    order: 1;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    align-self: center;
    width: auto;
    height: auto;
    max-width: 600px;
    max-height: 400px;
    padding: 32px;
    @media (max-width: ${smallDesktop.max}) {
      max-width: 400px;
      max-height: 300px;
      padding: 24px;
    }
    @media (max-width: ${mobile.max}) {
      flex: 1;
      max-width: 500px;
      max-height: 300px;
      padding: 16px;
    }
  `,
  LeftColumn = styled.div`
    height: 100%;
    overflow-y: auto;
    flex: 1;
    order: 2;
    padding: 48px;
    @media (max-width: ${mobile.max}) {
      flex: 1;
      padding: 0;
      overflow-y: inherit;
    }
  `;
