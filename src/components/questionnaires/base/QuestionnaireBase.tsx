import { Button, ProgressBar } from '@fluentui/react-components';
import _ from 'lodash';
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
  return (
    <>
      <div className="full-width flex-column">
        <div className="flex-row" style={{columnGap: '2px'}}>
          {
            context &&
            Array(context?.maxProgress ?? 0).fill(0).map((q, i) => {
              return <ProgressBar
                key={i}
                className="margin-bottom-xs"
                thickness="large"
                shape="rounded"
                value={i < context?.progress ? 1 : (i === context?.progress && !_.isNil(subQuestionIndex) ? subQuestionIndex : 0)}
                max={i < context?.progress ? 1 : (i === context?.progress ? maxSubQuestions : 1)}
              />
            })
          }
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
  `;
