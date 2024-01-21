import { Button } from '@fluentui/react-components';
import styled from 'styled-components';
import { PropsWithChildren } from 'react';

export const QuestionnaireBase: React.FunctionComponent<PropsWithChildren<QuestionnaireBaseProps>> = ({
                                                                                                        questionTitle,
                                                                                                        nextEnabled,
                                                                                                        onNextClicked,
                                                                                                        nextButtonText,
                                                                                                        children
                                                                                                      }) => {
  return (
    <>
      {
        questionTitle &&
        <QuestionTitle>{questionTitle}</QuestionTitle>
      }
      <div className="full-height flex-column space-between full-width">
        <ChildrenContainer>
          {children}
        </ChildrenContainer>
        {
          onNextClicked &&
          <Button appearance="primary" size="large" className="full-width" onClick={onNextClicked}
                  disabled={!nextEnabled}>
            {nextButtonText || 'המשך'}
          </Button>
        }
      </div>
    </>
  );
}

export type QuestionnaireBaseProps = {
  questionTitle?: string;
  nextEnabled?: boolean;
  onNextClicked?: () => void;
  nextButtonText?: string;
}

const QuestionTitle = styled.h2`
          text-align: center;
          white-space: pre-line;
  `,
  ChildrenContainer = styled.div`
    display: flex;
    flex-direction: row;
    width: 100%;
    margin-bottom: 48px;
    overflow-x: auto;
    overflow-y: hidden;
  `;
