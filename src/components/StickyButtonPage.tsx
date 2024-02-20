import { Button } from '@fluentui/react-components';
import styled from 'styled-components';
import { PropsWithChildren } from 'react';
import { mobile, smallDesktop } from './styles/style.consts';


export const StickyBottomButtonPage: React.FC<PropsWithChildren<StickyBottomButtonPageProps>> = ({
                                                                                                   className,
                                                                                                   children,
                                                                                                   buttonText,
                                                                                                   onButtonClick,
                                                                                                   secondaryText,
                                                                                                   onSecondaryClick,
                                                                                                   smallScreenOnly,
                                                                                                 }) => {
  return (
    <StyledStickyBottomButtonPage $smallScreenOnly={smallScreenOnly} className={className}>
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
  smallScreenOnly?: boolean;
  className?: string;
}

const StyledStickyBottomButtonPage = styled.div<{ $smallScreenOnly?: boolean }>`
  width: 100%;
  flex: 1;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  overflow-y: auto;

  .page-container {
    display: flex;
    flex: 1;
    flex-direction: column;
    position: relative;
    .page-content {
      display: flex;
      flex-direction: column;
      flex: 1;
      padding: 24px 64px;
      @media (max-width: ${smallDesktop.max}) {
        border-radius: 0;
        padding: 16px 32px;
      }
      @media (max-width: ${mobile.max}) {
        border-radius: 0;
        padding: 8px 16px;
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

    .shadow, .shadow-cover {
      @media (min-width: ${mobile.min}) {
        display: ${props => props.$smallScreenOnly ? 'none' : 'block'};
      }
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
    align-items: center;
    @media (min-width: ${mobile.min}) {
      display: ${props => props.$smallScreenOnly ? 'none' : undefined};
    }
  }
  .sticky-bottom-button > button {
    width: 100%;
    max-width: 600px;
  }
`;
