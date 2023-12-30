import { MinMaxScale } from './MinMaxScale';
import { DiscreteScale } from './DiscreteScale';
import { YesNo } from './YesNo';
import { FreeNumeric } from './FreeNumeric';
import { Cutoff } from './Cutoff';
import { Condition } from './Condition';
import { FreeText } from './FreeText';

export type OnNextClickedFunction = (state: unknown, didPassScoreBar: boolean, score: number | string) => void;
export type QuestionBase = {
  questionnaire: string;
  questionnaireType: string;
}

export type QuestionnaireBaseProps = QuestionBase & {
  initialState: unknown;
  onNextClicked: OnNextClickedFunction;
}

export const questionTypeToComponentMap: Record<string, React.FC<any>> = {
  'min-max-scale': MinMaxScale,
  'discrete-scale': DiscreteScale,
  'yes-no': YesNo,
  'free-numeric': FreeNumeric,
  'cut-off': Cutoff,
  'condition-questionnaire': Condition,
  'free-text': FreeText,
};
