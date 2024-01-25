import { MinMaxScale } from './MinMaxScale';
import { DiscreteScale } from './DiscreteScale';
import { YesNo } from './YesNo';
import { FreeNumeric } from './FreeNumeric';
import { Cutoff } from './Cutoff';
import { Condition } from './Condition';
import { FreeText } from './FreeText';
import { MultiDiscreteScale } from './MultiDiscreteScale';
import { TrueFalse } from './TrueFalse';

export type OnNextClickedFunction = (state: unknown, didPassThreshold: boolean, score?: number | string) => void;
export type QuestionBase = {
  questionnaire: string;
  questionnaireType: string;
}

export type QuestionnaireBaseProps = QuestionBase & {
  initialState: unknown;
  onNextClicked?: OnNextClickedFunction;
}

export const QuestionnaireTypes = {
  MIN_MAX_SCALE: 'min-max-scale',
  DISCRETE_SCALE: 'discrete-scale',
  YES_NO: 'yes-no',
  FREE_NUMERIC: 'free-numeric',
  CUT_OFF: 'cut-off',
  CONDITION_QUESTIONNAIRE: 'condition-questionnaire',
  FREE_TEXT: 'free-text',
  MULTI_DISCRETE_SCALE: 'multi-discrete-scale',
  TRUE_FALSE: 'true-false',
};

export const QuestionnaireNames = {
  CGI: 'CGI',
  GAD_2: 'GAD-2',
  PHQ_2: 'PHQ-2',
  K5: 'K5',
  PC_PTSD_5: 'PC-PTSD-5',
  CSE_T: 'CSE-T',
  Dissociation: 'Dissociation',
  Derealization: 'Derealization',
  SAST: 'SAST',
  PCL_5: 'PCL-5',
  STO: 'STO',
  GAD_7: 'GAD-7',
  PHQ_9: 'PHQ-9',
  ICG: 'ICG',
  WANT_HELP: 'צורך/רצון בעזרה מקצועית',
  EXTRA_INFO: 'מידע נוסף',
};

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
