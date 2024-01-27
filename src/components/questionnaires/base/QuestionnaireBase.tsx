import { Button, ProgressBar, tokens } from '@fluentui/react-components';
import styled from 'styled-components';
import { PropsWithChildren, useContext } from 'react';
import { QuestionnaireContext, QuestionnaireContextType } from '../../../store/QuestionnaireContext';

export const QuestionnaireBase: React.FunctionComponent<PropsWithChildren<QuestionnaireBaseProps>> = ({
                                                                                                        questionTitle,
                                                                                                        nextEnabled,
                                                                                                        onNextClicked,
                                                                                                        nextButtonText,
                                                                                                        subQuestionIndex,
                                                                                                        maxSubQuestions,
                                                                                                        children
                                                                                                      }) => {

  const context = useContext<QuestionnaireContextType>(QuestionnaireContext);
  const hasSubQuestions = subQuestionIndex !== undefined && maxSubQuestions !== undefined;
  return (
    <>
      <div className="full-width flex-column">
        <ProgressBar
          className="margin-top-sm"
          thickness="large"
          shape="rounded"
          value={context?.progress}
          max={context?.maxProgress}
        />
        <div className="full-width flex-row space-between">
          <StyledProgressText $align="right">{context?.verbalProgress}</StyledProgressText>
          <StyledProgressText $align="left">
            {hasSubQuestions ? `שאלה ${subQuestionIndex + 1} מתוך ${maxSubQuestions + 1}` : ''}
          </StyledProgressText>
        </div>
      </div>
      {
        questionTitle &&
        <QuestionTitle>{questionTitle}</QuestionTitle>
      }
      <div className="full-height flex-column full-width">
        <ChildrenContainer>
          {children}
        </ChildrenContainer>
        {
          onNextClicked &&
          <Button appearance="primary" size="large" className="full-width" onClick={onNextClicked}
                  shape="circular" disabled={!nextEnabled}>
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
  subQuestionIndex?: number;
  maxSubQuestions?: number;
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
  `,
  StyledProgressText = styled.div<{ $align: string; }>`
    font-size: 12px;
    width: 100%;
    text-align: ${props => props.$align};
    color: ${props => (props.$align === 'left' ? tokens.colorBrandBackground : tokens.colorNeutralForeground4)};
  `;
