import { useMemo, useState } from 'react';
import { observer } from 'mobx-react-lite';
import { Radio, RadioGroup, RadioGroupOnChangeData } from '@fluentui/react-components';
import { QuestionnaireBaseProps } from './types';
import { QuestionnaireBase } from './QuestionnaireBase';

export type MinMaxScaleProps = QuestionnaireBaseProps & {
  threshold: number;
  min: number;
  max: number;
  minLabel: string;
  maxLabel: string;
  questionTitle: string;
}

export const MinMaxScale: React.FC<MinMaxScaleProps> = observer(({
                                                                   initialState,
                                                                   threshold,
                                                                   min,
                                                                   max,
                                                                   minLabel,
                                                                   maxLabel,
                                                                   questionTitle,
                                                                   onNextClicked,
                                                                 }) => {

  const rangeValues = Array.from(Array(max - min - 1).keys()).map(i => i + min + 1);
  const [selection, setSelection] = useState<number>(initialState as number);
  const onSelectionChanged = (_, { value }: RadioGroupOnChangeData) => {
    setSelection(parseInt(value));
  };
  const didPassThreshold = !!(selection && selection >= threshold);
  const onNext = useMemo(() => onNextClicked ? () => onNextClicked(selection, didPassThreshold, selection!) : undefined, [onNextClicked, selection, didPassThreshold]);

  return (
    <QuestionnaireBase questionTitle={questionTitle} nextEnabled={selection !== undefined} onNextClicked={onNext}>
      <RadioGroup onChange={onSelectionChanged}>
        <Radio value={min.toString()} label={`${min} (${minLabel})`} checked={selection === min}/>
        {
          rangeValues.map(value => <Radio key={value} label={value.toString()} value={value.toString()}
                                          checked={selection === value}/>)
        }
        <Radio value={max.toString()} label={`${max} (${maxLabel})`} checked={selection === max}/>
      </RadioGroup>
    </QuestionnaireBase>
  );
});
