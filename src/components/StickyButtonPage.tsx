import { Button } from '@fluentui/react-components';
import styled from 'styled-components';
import { PropsWithChildren } from 'react';


export const StickyBottomButtonPage: React.FC<PropsWithChildren<StickyBottomButtonPageProps>> = ({
                                                                                children,
                                                                                buttonText,
                                                                                onButtonClick,
                                                                                secondaryText,
                                                                                onSecondaryClick
                                                                              }) => {
  return (
    <StyledStickyBottomButtonPage>
      <div className="page-container">
        <div className="page-content">
          {children}
        </div>
        <div className="shadow"/>
        <div className="shadow-cover"/>
      </div>
      <div className="sticky-bottom-button">
        <Button className="full-width" appearance="primary" onClick={onButtonClick} size="large"
                shape="circular">{buttonText}</Button>
        {
          secondaryText && onSecondaryClick &&
          <Button className="full-width margin-top-sm" appearance="secondary" onClick={onSecondaryClick} size="large"
                  shape="circular">{secondaryText}</Button>
        }
      </div>
    </StyledStickyBottomButtonPage>
  );
}

type StickyBottomButtonPageProps = {
  buttonText: string;
  onButtonClick: () => void;
  secondaryText?: string;
  onSecondaryClick?: () => void;
}

const StyledStickyBottomButtonPage = styled.div`
  width: 100%;
  height: 100%;
  flex: 1;
  display: flex;
  flex-direction: column;
  justify-content: space-between;

  .page-container {
    display: flex;
    flex: 1;
    flex-direction: column;
    position: relative;
    .page-content {
      display: flex;
      flex-direction: column;
      flex: 1;
      padding: 24px;
      @media (max-width: 390px) {
        border-radius: 0;
        padding: 8px;
      }
    }
    .shadow {
      position: sticky;
      bottom: 68px;
      display: block;
      height: 2px;
      box-shadow: 0 -4px 4px 0 rgba(0, 0, 0, 0.25);
      width: 100%;
      white-space: pre;
      margin-top: 4px;
      z-index: 1;
    }
    .shadow-cover {
      background: white;
      position: absolute;
      bottom: -1px;
      width: 100%;
      height: 11px;
      z-index: 1;
    }
  }
  .sticky-bottom-button {
    display: flex;
    flex-direction: column;
    width: 100%;
    background: white;
    position: sticky;
    bottom: 0;
    z-index: 1;
    padding: 16px;
    box-sizing: border-box;
    row-gap: 16px;
  }
  .sticky-bottom-button > button {
    width: 100%;
  }
`;
