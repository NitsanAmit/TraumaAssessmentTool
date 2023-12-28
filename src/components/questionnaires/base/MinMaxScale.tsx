import { Question } from '../QuestionnairesFlow';
import styled from 'styled-components';
import { Button, RadioButton } from 'monday-ui-react-core';
import { useState } from 'react';
import { observer } from 'mobx-react-lite';

export type MinMaxScaleProps = Question & {
  scoreBar: number;
  min: number;
  max: number;
  minLabel: string;
  maxLabel: string;
  questionTitle: string;
}

export const MinMaxScale: React.FC<MinMaxScaleProps> = observer(({
                                                                   scoreBar,
                                                                   min,
                                                                   max,
                                                                   minLabel,
                                                                   maxLabel,
                                                                   questionTitle,
                                                                   onNextClicked,
                                                                 }) => {

  const rangeValues = Array.from(Array(max - min - 1).keys()).map(i => i + min + 1);
  const [selection, setSelection] = useState<number>();
  const onSelectionChanged = (value: number) => {
    setSelection(value);
  };
  const didPassScoreBar = !!(selection && selection >= scoreBar);
  return (
    <>
      <QuestionTitle>{questionTitle}</QuestionTitle>
      <div className="flex-row full-width">
        <StyledRadioButton text={minLabel} value={min.toString()} checked={selection === min} onSelect={() => onSelectionChanged(min)}/>
        {
          rangeValues.map(value => <StyledRadioButton key={value}
                                                      text={value.toString()}
                                                      value={value.toString()}
                                                      checked={selection === value}
                                                      onSelect={() => onSelectionChanged(value)}/>)
        }
        <StyledRadioButton text={maxLabel} value={max.toString()} checked={selection === max} onSelect={() => onSelectionChanged(max)}/>
      </div>
      <Button className="margin-top-ml" onClick={() => onNextClicked(didPassScoreBar, selection!)} disabled={!selection}>המשך</Button>
    </>
  );
});

const QuestionTitle = styled.h2`
          color: salmon;
          text-align: center;
  `,
  StyledRadioButton = styled(RadioButton)`
    display: flex;
    flex-direction: column;
    flex: 1;
    align-items: center;
  `;
