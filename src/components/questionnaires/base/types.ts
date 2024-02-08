import { MinMaxScale } from './MinMaxScale';
import { DiscreteScale } from './DiscreteScale';
import { YesNo } from './YesNo';
import { FreeNumeric } from './FreeNumeric';
import { Cutoff } from './Cutoff';
import { Condition } from './Condition';
import { FreeText } from './FreeText';
import { MultiDiscreteScale } from './MultiDiscreteScale';
import { TrueFalse } from './TrueFalse';
import { QuestionnaireTypes } from '../../../data/data.consts';

export type OnNextClickedFunction = (state: unknown, didPassThreshold: boolean, score?: number | string) => void;
export type QuestionBase = {
  questionnaire: string;
  questionnaireType: string;
  questionnaires?: QuestionBase[];
  conditionQuestionnaire?: QuestionBase;
  threshold?: number;
}

export type QuestionnaireBaseProps = QuestionBase & {
  initialState: unknown;
  onNextClicked?: OnNextClickedFunction;
}

export const questionTypeToComponentMap: Record<string, React.FC<any>> = {
  [QuestionnaireTypes.MIN_MAX_SCALE]: MinMaxScale,
  [QuestionnaireTypes.DISCRETE_SCALE]: DiscreteScale,
  [QuestionnaireTypes.YES_NO]: YesNo,
  [QuestionnaireTypes.FREE_NUMERIC]: FreeNumeric,
  [QuestionnaireTypes.CUT_OFF]: Cutoff,
  [QuestionnaireTypes.CONDITION_QUESTIONNAIRE]: Condition,
  [QuestionnaireTypes.FREE_TEXT]: FreeText,
  [QuestionnaireTypes.MULTI_DISCRETE_SCALE]: MultiDiscreteScale,
  [QuestionnaireTypes.TRUE_FALSE]: TrueFalse,
};
