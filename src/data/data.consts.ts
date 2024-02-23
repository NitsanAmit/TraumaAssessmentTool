
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
} as const;

export type QuestionnaireType = typeof QuestionnaireTypes[keyof typeof QuestionnaireTypes];

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
} as const;

export type QuestionnaireName = typeof QuestionnaireNames[keyof typeof QuestionnaireNames];

export const QUESTIONNAIRE_NAME_TO_PURPOSE: Partial<Record<QuestionnaireName, string>> = {
  [QuestionnaireNames.CGI]: 'מצוקה כללית',
  [QuestionnaireNames.GAD_2]: 'שאלון חרדה (קצר)',
  [QuestionnaireNames.PHQ_2]: 'שאלון דיכאון (קצר)',
  [QuestionnaireNames.K5]: 'מצוקה כללית',
  [QuestionnaireNames.PC_PTSD_5]: 'סימני PTSD (קצר)',
  [QuestionnaireNames.CSE_T]: 'התמודדות',
  [QuestionnaireNames.Dissociation]: 'דיסוציאציה',
  [QuestionnaireNames.Derealization]: 'דיסוציאציה',
  [QuestionnaireNames.SAST]: 'מתח וחרדה',
  [QuestionnaireNames.PCL_5]: 'סימני PTSD (מלא)',
  [QuestionnaireNames.STO]: 'תפיסה אישית של טראומה',
  [QuestionnaireNames.GAD_7]: 'שאלון חרדה (מלא)',
  [QuestionnaireNames.PHQ_9]: 'שאלון דיכאון (מלא)',
  [QuestionnaireNames.ICG]: 'אובדן ושכול',
  [QuestionnaireNames.WANT_HELP]: 'מצוקה כללית',
}

export const QUESTIONNAIRE_NAME_TO_ELEMENT: Partial<Record<QuestionnaireName, string>> = {
  [QuestionnaireNames.CGI]: 'מצוקה',
  [QuestionnaireNames.GAD_2]: 'חרדה',
  [QuestionnaireNames.PHQ_2]: 'דיכאון',
  [QuestionnaireNames.K5]: 'מצוקה',
  [QuestionnaireNames.PC_PTSD_5]: 'פוסט־טראומה',
  [QuestionnaireNames.CSE_T]: 'התמודדות',
  [QuestionnaireNames.Dissociation]: 'דיסוציאציה',
  [QuestionnaireNames.Derealization]: 'דיסוציאציה',
  [QuestionnaireNames.SAST]: 'מתח',
  [QuestionnaireNames.PCL_5]: 'פוסט־טראומה',
  [QuestionnaireNames.STO]: 'פוסט־טראומה',
  [QuestionnaireNames.GAD_7]: 'חרדה',
  [QuestionnaireNames.PHQ_9]: 'דיכאון',
  [QuestionnaireNames.ICG]: 'תגובות לאבדן ושכול',
  [QuestionnaireNames.WANT_HELP]: 'מצוקה',
}

export const QUESTIONNAIRE_NAME_TO_SYMPTOMS: Partial<Record<QuestionnaireName, string>> = {
  [QuestionnaireNames.Dissociation]: 'אובדן קשר עם מה שקורה לך או סביבך',
  [QuestionnaireNames.Derealization]: 'אובדן קשר עם מה שקורה לך או סביבך',
  [QuestionnaireNames.SAST]: 'אי־שקט ומצב רוח רע',
  [QuestionnaireNames.PCL_5]: 'סימני פוסט־טראומה',
  [QuestionnaireNames.STO]: 'שינוי לרעה בחייך',
  [QuestionnaireNames.GAD_7]: 'חרדה',
  [QuestionnaireNames.PHQ_9]: 'עצב או דיכאון',
  [QuestionnaireNames.ICG]: 'אבל ואובדן מתמשך',
  [QuestionnaireNames.WANT_HELP]: 'רצון בייעוץ או טיפול',
}

export const PHQ9SuicidalQuestionIndex = 8;
export const PHQ9SuicidalQuestionThreshold = 2;
